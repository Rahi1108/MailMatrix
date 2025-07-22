// Email service for Gmail SMTP integration
export interface EmailConfig {
  smtpHost: string;
  smtpPort: number;
  secure: boolean;
  user: string;
  pass: string;
}

export interface EmailData {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  html: string;
  text?: string;
}

export interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Gmail SMTP configuration
export const GMAIL_CONFIG: EmailConfig = {
  smtpHost: 'smtp.gmail.com',
  smtpPort: 587,
  secure: false, // true for 465, false for other ports
  user: '', // Your Gmail address
  pass: '', // Your App Password (not regular password)
};

// Frontend service to communicate with backend
export class EmailService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001/api') {
    this.baseUrl = baseUrl;
  }

  async sendEmail(emailData: EmailData): Promise<SendResult> {
    try {
      const response = await fetch(`${this.baseUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async sendBulkEmails(emails: EmailData[]): Promise<SendResult[]> {
    try {
      const response = await fetch(`${this.baseUrl}/send-bulk-emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results = await response.json();
      return results;
    } catch (error) {
      console.error('Bulk email sending failed:', error);
      return emails.map(() => ({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/test-connection`);
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}