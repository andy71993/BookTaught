# Vercel Deployment Configuration Guide

## ⚠️ CRITICAL: Fix 500 Error - Environment Variables Required

Your application will show a **500 error** until you add the required environment variables in Vercel.

### 1. Configure Vercel Environment Variables (REQUIRED)

**This is the #1 cause of deployment failures.** Without these, your app will not work.

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add these variables:

**Required Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Optional (for payments):**
```
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

**Where to find Supabase values:**
- Go to your Supabase Dashboard
- Navigate to **Settings** → **API**
- Copy **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
- Copy **anon/public** key (long string starting with `eyJ...`)

**Important:** After adding environment variables, you MUST **redeploy** your application for them to take effect. Click the "Redeploy" button in Vercel or push a new commit.

### 2. Configure Supabase Redirect URLs

1. Go to your Supabase project dashboard
2. Navigate to Authentication > URL Configuration
3. Add your Vercel deployment URLs to the **Site URL** and **Redirect URLs**:

```
Site URL: https://your-app.vercel.app

Redirect URLs:
- https://your-app.vercel.app
- https://your-app.vercel.app/auth/callback
- http://localhost:3000 (for local development)
- http://localhost:3000/auth/callback
```

**Note:** Replace `your-app.vercel.app` with your actual Vercel domain.

### 3. Update Stripe Webhook (When Ready)

Once you're ready to accept payments:

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-app.vercel.app/api/webhook`
3. Select events: `checkout.session.completed`
4. Copy the webhook signing secret
5. Add it to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

### 4. Redeploy After Configuration

After updating environment variables or Supabase settings:

```bash
# Trigger a new deployment
git commit --allow-empty -m "Trigger Vercel redeploy"
git push
```

Or use the Vercel dashboard to trigger a redeploy.

## Common Issues

### Login not working
- ✅ Check environment variables are set in Vercel
- ✅ Verify Supabase redirect URLs include your Vercel domain
- ✅ Redeploy after making changes

### "Auth session missing" errors
- ✅ Middleware is now properly configured to refresh sessions
- ✅ Ensure @supabase/ssr package is installed (it is)

### Cookies not persisting
- ✅ Middleware handles cookie management automatically
- ✅ Make sure your domain doesn't block third-party cookies

## Testing Checklist

After deployment:

- [ ] Can sign up for a new account
- [ ] Can log in with existing account
- [ ] Can log out
- [ ] Progress tracking works
- [ ] Upgrade button works
- [ ] Paid chapters accessible after upgrade
- [ ] Dashboard shows reading progress

## Production Best Practices

1. **Never commit secrets** - Keep .env.local in .gitignore
2. **Use environment-specific URLs** - Different Supabase projects for dev/prod
3. **Monitor Vercel logs** - Check for errors in production
4. **Set up Stripe webhooks** - Required for automatic user upgrades
