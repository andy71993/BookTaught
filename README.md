# 📚 BookTaught - Learn Books Like a PhD Mentor

A modern web application that teaches people the books they buy like a PhD mentor. Built with Next.js 14, Supabase, Stripe, and Tailwind CSS.

## ✨ Features

### MVP Features (Completed)

- **User Authentication**
  - Email/password signup and login
  - Password reset functionality
  - Secure session management with Supabase Auth

- **Book Library**
  - Beautiful homepage displaying 5 books
  - Book cards with covers, titles, authors, and descriptions
  - "Coming Soon" badges for upcoming content

- **Chapter Learning Interface**
  - Medium-style reading experience
  - Beautiful markdown rendering with syntax highlighting
  - Expert-crafted teaching modules for each chapter
  - Progress tracking with completion checkmarks
  - Navigation between chapters

- **Payment Integration**
  - Stripe checkout for one-time payment ($49)
  - Founding Member pricing model
  - Paywall after 1 free chapter per book
  - Secure webhook handling for payment verification

- **User Dashboard**
  - "My Books" view with progress tracking
  - Visual progress bars for each book
  - "Continue where you left off" functionality
  - Upgrade prompt for free users

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Hosting**: Vercel (recommended)
- **Content**: Markdown files in Git

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Supabase account (free tier)
- Stripe account (free tier)

### Quick Start

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables** - Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Set up Supabase database**
   - Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor

4. **Run the development server**
```bash
npm run dev
```

📖 **See [SETUP.md](./SETUP.md) for detailed setup instructions**

## 📁 Project Structure

```
BookTaught/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes (Stripe checkout, webhooks)
│   ├── auth/                 # Authentication pages
│   ├── books/                # Book and chapter pages
│   ├── dashboard/            # User dashboard
│   ├── payment/              # Payment success/cancel pages
│   └── upgrade/              # Upgrade to paid page
├── components/               # React components
├── content/books/            # Book content (markdown + metadata)
├── lib/                      # Utilities (auth, stripe, supabase)
├── supabase/                 # Database schema
└── public/                   # Static assets

```

## 🎨 Adding New Books

1. Add metadata to `content/books/books.json`
2. Create markdown files in `content/books/your-book-slug/`
3. Add cover image to `public/covers/`

See [SETUP.md](./SETUP.md) for detailed instructions.

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy
5. Configure Stripe webhooks

Full deployment guide in [SETUP.md](./SETUP.md)

## 🧪 Testing

- **Test card**: `4242 4242 4242 4242`
- **Expiry**: Any future date
- **CVC**: Any 3 digits

See [SETUP.md](./SETUP.md) for complete testing guide.

## 📊 Database Schema

Tables:
- `profiles` - User profiles
- `books` - Book metadata
- `chapters` - Chapter metadata
- `user_progress` - Reading progress
- `payments` - Payment records

See `supabase/schema.sql` for full schema.

## 🎯 Roadmap

### ✅ Phase 1 - MVP (Completed)
- User authentication
- Book library & reading interface
- Progress tracking
- Stripe payments & paywall
- User dashboard

### 🔮 Phase 2 - Future
- AI chat for personalized learning
- Community features
- Mobile apps
- Advanced analytics

## 📝 License

MIT License

---

**Made with ❤️ for learners who want to deeply understand the books they read.**
