# NextSalon - Customer Feedback Platform

A modern, clean feedback platform for salon customers to share their experiences with staff members.

## Features

- ✨ Clean, modern UI design
- 📱 Fully responsive
- 🔒 Confidential feedback submission
- ✅ Form validation with error handling
- 📧 Email notifications to salon owner
- 💾 Supabase database storage
- 📅 Custom calendar component
- 🚀 Built with Next.js 14 and TypeScript

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Database**: Supabase
- **Calendar**: React Calendar
- **Email**: Ready for Resend integration

## Quick Setup

1. **Clone and install**

   ```bash
   git clone <repository-url>
   cd nextsalon
   npm install
   ```

2. **Environment variables**
   Create `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Set up Supabase database**

   - Go to your Supabase project
   - Open the SQL Editor
   - Run the SQL from `supabase-setup.sql`

4. **Run the project**

```bash
npm run dev
```

## Supabase Database Setup

### 1. Create the Table

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  staff TEXT NOT NULL,
  visit_date DATE,
  feedback TEXT NOT NULL,
  contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Set up Security

```sql
-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous feedback submission
CREATE POLICY "Allow anonymous feedback submission" ON feedback
  FOR INSERT WITH CHECK (true);
```

### 3. Create Indexes (Optional)

```sql
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX idx_feedback_staff ON feedback(staff);
```

## Email Integration (Optional)

### Using Resend

1. **Install Resend**

   ```bash
   npm install resend
   ```

2. **Add to environment**

   ```env
   RESEND_API_KEY=your_resend_api_key
   ```

3. **Update server action**
   Uncomment the email code in `src/app/actions/feedback.ts` and add:
   ```typescript
   import { Resend } from "resend";
   const resend = new Resend(process.env.RESEND_API_KEY);
   ```

## Project Structure

```
src/
├── app/
│   ├── actions/
│   │   └── feedback.ts          # Server action for form submission
│   ├── report/
│   │   └── page.tsx            # Feedback form page
│   ├── globals.css             # Global styles + calendar styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── CustomCalendar.tsx      # Custom calendar component
│   ├── Footer.tsx              # Footer with UVISE credit
│   └── Navbar.tsx              # Navigation bar
└── lib/
    └── supabase.ts             # Supabase client configuration
```

## Features Explained

### Custom Calendar

- Built with `react-calendar`
- Styled to match the website design
- Prevents future date selection
- Optional date clearing

### Form Validation

- Real-time validation with Zod
- Character limits and requirements
- Visual error indicators
- Loading states during submission

### Database Storage

- Automatic UUID generation
- Timestamp tracking
- Optional visit date and contact info
- Row Level Security enabled

## Customization

### Styling

- Primary color: `#FF3B30` (red)
- Change colors in `tailwind.config.js`
- Calendar styles in `globals.css`

### Form Fields

- Modify validation in `src/app/actions/feedback.ts`
- Update form UI in `src/app/report/page.tsx`
- Add/remove fields as needed

### Database Schema

- Modify table structure in Supabase
- Update TypeScript types in `src/lib/supabase.ts`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key (optional)
```

## Credits

Built by [UVISE](https://uvise.ng)

## License

MIT License - feel free to use this project for your salon or business.
