# MailMatrix - Smart Email Dispatcher

A professional mass-mail dispatcher application built with React, TypeScript, and Tailwind CSS, featuring Gmail SMTP integration for reliable email delivery.

## 🚀 Features

- **Smart Email Classification**: Automatically categorizes contacts into TO/CC/BCC groups
- **Gmail SMTP Integration**: Send emails through Google's reliable SMTP servers
- **CSV Upload & Validation**: Process contact lists with real-time validation
- **Professional UI**: Modern, responsive design with Tailwind CSS
- **Campaign Management**: Complete workflow from upload to delivery

## 📋 Prerequisites

- Node.js (v16 or higher)
- Gmail account with 2-Factor Authentication enabled
- Gmail App Password (for SMTP access)

## 🛠️ Setup Instructions

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Backend Setup (for Gmail SMTP)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Configure Gmail SMTP:**
   - Copy `.env.example` to `.env`
   - Add your Gmail credentials:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   PORT=3001
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```

## 🔐 Gmail SMTP Configuration

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication if not already enabled

### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" as the app
3. Copy the 16-character password
4. Use this password in your `.env` file (NOT your regular Gmail password)

### Step 3: SMTP Settings
- **Host:** smtp.gmail.com
- **Port:** 587 (TLS) or 465 (SSL)
- **Security:** TLS/STARTTLS
- **Authentication:** Required

## 📁 Project Structure

```
mailmatrix/
├── src/
│   ├── components/
│   │   └── Navigation.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── UploadContacts.tsx
│   │   ├── ComposeEmail.tsx
│   │   └── SendCampaign.tsx
│   ├── services/
│   │   └── emailService.ts
│   └── App.tsx
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🎯 Usage Workflow

1. **Dashboard**: View campaign statistics and quick actions
2. **Upload Contacts**: Import CSV files with email addresses
3. **Compose Email**: Write your message with sender validation
4. **Send Campaign**: Review and send via Gmail SMTP or demo mode

## 📧 Email Sending Options

### Real Gmail SMTP Sending
- Requires backend server setup
- Uses your Gmail account for sending
- Reliable delivery through Google's servers
- Proper email headers and formatting

### Demo Mode
- Frontend-only simulation
- No actual emails sent
- Perfect for testing UI/UX
- Shows realistic progress indicators

## 🔧 API Endpoints

- `GET /api/health` - Health check
- `GET /api/test-connection` - Test SMTP connection
- `POST /api/send-email` - Send single email
- `POST /api/send-bulk-emails` - Send multiple emails

## 🚨 Important Security Notes

1. **Never commit your `.env` file** to version control
2. **Use App Passwords**, not your regular Gmail password
3. **Enable 2FA** on your Google account
4. **Keep your credentials secure** and rotate them regularly

## 📊 Gmail Sending Limits

- **Daily limit**: 500 emails per day for regular Gmail accounts
- **Rate limiting**: ~1 email per second recommended
- **Bulk sending**: Consider Google Workspace for higher limits

## 🛡️ Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**
   - Verify App Password is correct
   - Ensure 2FA is enabled
   - Check Gmail username

2. **"Connection refused" error**
   - Backend server not running
   - Check port 3001 is available
   - Verify SMTP settings

3. **"Daily sending quota exceeded"**
   - Wait 24 hours for quota reset
   - Consider Google Workspace for higher limits

## 🔄 Development vs Production

### Development
- Use demo mode for UI testing
- Backend runs on localhost:3001
- CORS enabled for local development

### Production
- Deploy backend to cloud service
- Use environment variables for configuration
- Implement proper error handling and logging
- Consider email queue for bulk sending

## 📈 Future Enhancements

- Email templates and personalization
- Delivery tracking and analytics
- Contact list management
- Campaign scheduling
- Integration with other email providers
- Database persistence for campaigns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.