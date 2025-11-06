# BookTaught Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn
- Supabase account (free tier)
- Stripe account (free tier)
- Vercel account (free tier)

## Step 1: Clone & Install

```bash
git clone <your-repo>
cd BookTaught
npm install
```

## Step 2: Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned (~2 minutes)
3. Go to **SQL Editor** in the Supabase dashboard
4. Copy and paste the contents of `supabase/schema.sql`
5. Click **Run** to execute the SQL
6. Go to **Settings** → **API** and copy:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Step 3: Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize signup, password reset emails

## Step 4: Set up Stripe

1. Go to [stripe.com](https://stripe.com) and create an account
2. Enable **Test Mode** (toggle in top right)
3. Go to **Developers** → **API Keys**
4. Copy:
   - Publishable key (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
   - Secret key (STRIPE_SECRET_KEY)
5. Create a product:
   - Go to **Products** → **Add Product**
   - Name: "BookTaught Founding Member"
   - Price: $49 (or your chosen price)
   - Type: One-time payment
   - Copy the Price ID

## Step 5: Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 6: Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your GitHub repository
5. Add all environment variables from `.env.local`
6. Click **Deploy**

## Step 8: Configure Stripe Webhooks (Production)

1. In Stripe dashboard, go to **Developers** → **Webhooks**
2. Click **Add Endpoint**
3. URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing Secret** and add it to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

## Testing

### Test Authentication:
1. Go to `/auth/signup`
2. Create an account
3. Check Supabase dashboard → **Authentication** → **Users** to see the new user
4. Check Supabase dashboard → **Table Editor** → **profiles** to see the profile

### Test Free Chapter:
1. Go to homepage
2. Click on "$100M Offers"
3. Click "Chapter 1: How We Got Here"
4. Read the chapter (should be free)

### Test Paywall:
1. Try to access a paid chapter (any chapter besides Chapter 1)
2. Should see "Upgrade to Founding Member" prompt
3. Click upgrade, complete Stripe checkout (use test card: 4242 4242 4242 4242)
4. After payment, should have full access

## Troubleshooting

### Build errors:
- Make sure all dependencies are installed: `npm install`
- Clear Next.js cache: `rm -rf .next` then `npm run build`

### Supabase connection errors:
- Check that environment variables are correct
- Verify your Supabase project is active
- Check RLS policies in Supabase dashboard

### Stripe errors:
- Make sure you're using test mode keys
- Check that webhook secret is correct
- Verify products/prices are created in Stripe dashboard

## Next Steps

1. Add more books and chapters to `content/books/`
2. Update `content/books/books.json` with metadata
3. Add book cover images to `public/covers/`
4. Customize styling in `app/globals.css` and components
5. Set up custom domain in Vercel
6. Configure custom email domain in Supabase (for production)

## Support

For issues or questions:
- Check the [Next.js docs](https://nextjs.org/docs)
- Check the [Supabase docs](https://supabase.com/docs)
- Check the [Stripe docs](https://stripe.com/docs)
