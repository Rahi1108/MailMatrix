// Backend server for Gmail SMTP integration
// Run this with: node backend/server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Gmail SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Your App Password
    },
  });
};

// Test SMTP connection
app.get('/api/test-connection', async (req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    res.json({ success: true, message: 'SMTP connection successful' });
  } catch (error) {
    console.error('SMTP connection failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send single email
app.post('/api/send-email', async (req, res) => {
  try {
    const { from, to, cc, bcc, subject, html, text } = req.body;
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: from || process.env.GMAIL_USER,
      to: to.join(', '),
      cc: cc ? cc.join(', ') : undefined,
      bcc: bcc ? bcc.join(', ') : undefined,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    };

    const info = await transporter.sendMail(mailOptions);
    
    res.json({
      success: true,
      messageId: info.messageId,
      response: info.response,
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Send bulk emails
app.post('/api/send-bulk-emails', async (req, res) => {
  try {
    const { emails } = req.body;
    const transporter = createTransporter();
    const results = [];

    for (const emailData of emails) {
      try {
        const { from, to, cc, bcc, subject, html, text } = emailData;
        
        const mailOptions = {
          from: from || process.env.GMAIL_USER,
          to: to.join(', '),
          cc: cc ? cc.join(', ') : undefined,
          bcc: bcc ? bcc.join(', ') : undefined,
          subject,
          html,
          text: text || html.replace(/<[^>]*>/g, ''),
        };

        const info = await transporter.sendMail(mailOptions);
        
        results.push({
          success: true,
          messageId: info.messageId,
        });

        // Add delay between emails to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error('Individual email failed:', error);
        results.push({
          success: false,
          error: error.message,
        });
      }
    }

    res.json(results);
  } catch (error) {
    console.error('Bulk email sending failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`MailMatrix backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});