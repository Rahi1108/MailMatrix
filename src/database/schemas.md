# MailMatrix Database Schema

## Database Choice: Supabase (PostgreSQL)

For MailMatrix, we recommend using **Supabase** instead of MongoDB as it provides:
- Real-time subscriptions for live campaign updates
- Built-in authentication and user management
- Row Level Security for data protection
- Better integration with React/TypeScript
- Automatic API generation
- Works seamlessly in WebContainer environment

## Database Schema

### 1. Users Table (Built-in Supabase Auth)
Supabase provides built-in user authentication, so we'll extend it with a profiles table:

```sql
-- User profiles extending Supabase auth.users
CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE,
  email text,
  full_name text,
  organization text,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 2. Mail Campaigns Table

```sql
CREATE TABLE mail_campaigns (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  sender_name text NOT NULL,
  sender_email text NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed', 'cancelled')),
  scheduled_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Recipient counts
  to_count integer DEFAULT 0,
  cc_count integer DEFAULT 0,
  bcc_count integer DEFAULT 0,
  
  -- Delivery statistics
  delivered_count integer DEFAULT 0,
  bounced_count integer DEFAULT 0,
  failed_count integer DEFAULT 0,
  delivery_rate decimal(5,2)
);

-- Enable RLS
ALTER TABLE mail_campaigns ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage own campaigns" ON mail_campaigns
  FOR ALL USING (auth.uid() = user_id);
```

### 3. Email Lists Table

```sql
CREATE TABLE email_lists (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id uuid REFERENCES mail_campaigns(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text,
  category text DEFAULT 'to' CHECK (category IN ('to', 'cc', 'bcc')),
  is_valid boolean DEFAULT true,
  validation_status text DEFAULT 'pending' CHECK (validation_status IN ('pending', 'valid', 'invalid', 'bounced')),
  validation_error text,
  delivery_status text DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'delivered', 'bounced', 'failed')),
  delivered_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE email_lists ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage own email lists" ON email_lists
  FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_email_lists_campaign ON email_lists(campaign_id);
CREATE INDEX idx_email_lists_email ON email_lists(email);
CREATE INDEX idx_email_lists_category ON email_lists(category);
```

### 4. Campaign Templates Table

```sql
CREATE TABLE campaign_templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  subject_template text NOT NULL,
  content_template text NOT NULL,
  category text DEFAULT 'general',
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE campaign_templates ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage own templates" ON campaign_templates
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view public templates" ON campaign_templates
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);
```

## Sample Data

### Sample Mail Campaigns
```sql
INSERT INTO mail_campaigns (user_id, title, subject, content, sender_name, sender_email, status, to_count, cc_count, bcc_count) VALUES
('user-uuid-1', 'Welcome New Students 2024', 'Welcome to University - Important Information Inside', 'Dear Student, Welcome to our university...', 'College Administration', 'admin@university.edu', 'sent', 245, 12, 3),
('user-uuid-1', 'Course Registration Reminder', 'Action Required: Complete Your Course Registration', 'Dear Students, This is a reminder...', 'Academic Affairs', 'academics@university.edu', 'draft', 189, 8, 2),
('user-uuid-1', 'Library Workshop Series', 'Join Our Research Skills Workshop Series', 'Dear Students and Faculty...', 'Library Services', 'library@university.edu', 'scheduled', 156, 15, 1);
```

### Sample Email Lists
```sql
INSERT INTO email_lists (campaign_id, user_id, email, name, category, is_valid, validation_status, delivery_status) VALUES
('campaign-uuid-1', 'user-uuid-1', 'john.doe@university.edu', 'John Doe', 'to', true, 'valid', 'delivered'),
('campaign-uuid-1', 'user-uuid-1', 'jane.smith@university.edu', 'Jane Smith', 'to', true, 'valid', 'delivered'),
('campaign-uuid-1', 'user-uuid-1', 'prof.wilson@university.edu', 'Prof. Wilson', 'cc', true, 'valid', 'delivered'),
('campaign-uuid-1', 'user-uuid-1', 'dean@university.edu', 'Dean Johnson', 'cc', true, 'valid', 'delivered'),
('campaign-uuid-1', 'user-uuid-1', 'admin@university.edu', 'Admin Office', 'bcc', true, 'valid', 'delivered');
```

### Sample Templates
```sql
INSERT INTO campaign_templates (user_id, title, description, subject_template, content_template, category, is_public) VALUES
('user-uuid-1', 'Welcome Message', 'Standard welcome email for new students', 'Welcome to {ORGANIZATION} - Important Information Inside', 'Dear {NAME}, Welcome to our {ORGANIZATION}!...', 'welcome', true),
('user-uuid-1', 'Event Announcement', 'Template for announcing campus events', 'Upcoming Event: {EVENT_NAME} - Mark Your Calendar', 'Dear {RECIPIENT_GROUP}, We are pleased to announce...', 'events', true),
('user-uuid-1', 'Reminder Notice', 'General reminder template', 'Important Reminder: {SUBJECT} - Action Required', 'Dear {RECIPIENT_GROUP}, This is a friendly reminder...', 'reminders', true);
```

## Supabase Client Setup

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (auto-generated)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          organization: string | null
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          organization?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          organization?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      mail_campaigns: {
        Row: {
          id: string
          user_id: string
          title: string
          subject: string
          content: string
          sender_name: string
          sender_email: string
          status: string
          scheduled_at: string | null
          sent_at: string | null
          created_at: string
          updated_at: string
          to_count: number
          cc_count: number
          bcc_count: number
          delivered_count: number
          bounced_count: number
          failed_count: number
          delivery_rate: number | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          subject: string
          content: string
          sender_name: string
          sender_email: string
          status?: string
          scheduled_at?: string | null
          sent_at?: string | null
          created_at?: string
          updated_at?: string
          to_count?: number
          cc_count?: number
          bcc_count?: number
          delivered_count?: number
          bounced_count?: number
          failed_count?: number
          delivery_rate?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          subject?: string
          content?: string
          sender_name?: string
          sender_email?: string
          status?: string
          scheduled_at?: string | null
          sent_at?: string | null
          created_at?: string
          updated_at?: string
          to_count?: number
          cc_count?: number
          bcc_count?: number
          delivered_count?: number
          bounced_count?: number
          failed_count?: number
          delivery_rate?: number | null
        }
      }
      email_lists: {
        Row: {
          id: string
          campaign_id: string
          user_id: string
          email: string
          name: string | null
          category: string
          is_valid: boolean
          validation_status: string
          validation_error: string | null
          delivery_status: string
          delivered_at: string | null
          opened_at: string | null
          clicked_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          user_id: string
          email: string
          name?: string | null
          category?: string
          is_valid?: boolean
          validation_status?: string
          validation_error?: string | null
          delivery_status?: string
          delivered_at?: string | null
          opened_at?: string | null
          clicked_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          user_id?: string
          email?: string
          name?: string | null
          category?: string
          is_valid?: boolean
          validation_status?: string
          validation_error?: string | null
          delivery_status?: string
          delivered_at?: string | null
          opened_at?: string | null
          clicked_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      campaign_templates: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          subject_template: string
          content_template: string
          category: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          subject_template: string
          content_template: string
          category?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          subject_template?: string
          content_template?: string
          category?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
```

## Project Structure Recommendation

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx
│   ├── ui/             # Basic UI components (buttons, inputs, etc.)
│   └── campaign/       # Campaign-specific components
├── pages/              # Main page components
│   ├── HomePage.tsx
│   ├── UploadCsvPage.tsx
│   ├── EmailClassificationPage.tsx
│   ├── EmailComposerPage.tsx
│   └── SendSimulationPage.tsx
├── lib/                # Utilities and configurations
│   ├── supabase.ts     # Supabase client setup
│   ├── types.ts        # TypeScript type definitions
│   └── utils.ts        # Helper functions
├── hooks/              # Custom React hooks
│   ├── useCampaigns.ts
│   ├── useEmailLists.ts
│   └── useAuth.ts
├── context/            # React context providers
│   └── AuthContext.tsx
└── assets/             # Static assets
    └── images/
```

This structure provides a solid foundation for your MailMatrix application with proper separation of concerns and scalability for future AI integration and backend enhancements.