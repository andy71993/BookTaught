# CLAUDE.md - AI Assistant Guide for BookTaught

This document provides essential context for AI assistants working with the BookTaught codebase.

## Project Overview

**BookTaught** is an educational learning platform that teaches users books through expert-crafted teaching modules. It's a full-stack Next.js 14 application with user authentication, progress tracking, and a freemium payment model ($49 one-time fee for unlimited access).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0 (strict mode)
- **UI**: React 18.3.1 + Tailwind CSS 3.4.0
- **Database**: PostgreSQL via Supabase
- **Auth**: Supabase Auth (email/password)
- **Payments**: Stripe API
- **Content**: Git-based markdown files
- **Hosting**: Vercel (recommended)

## Directory Structure

```
BookTaught/
├── app/                          # Next.js App Router pages
│   ├── api/                      # Server-side API routes
│   │   ├── create-checkout/      # Stripe checkout session
│   │   ├── track-progress/       # User progress tracking
│   │   └── webhooks/stripe/      # Stripe payment webhooks
│   ├── auth/                     # Auth pages (signup, login, forgot-password)
│   ├── books/                    # Book reading interface
│   │   ├── [slug]/               # Book detail page
│   │   └── [slug]/[chapter]/     # Chapter reading page
│   ├── dashboard/                # User dashboard
│   ├── payment/                  # Payment result pages
│   └── upgrade/                  # Upgrade CTA page
├── components/                   # Shared React components
│   ├── Navigation.tsx            # Top nav bar
│   ├── BookCard.tsx              # Book preview card
│   ├── ChapterPageClient.tsx     # Chapter reading UI
│   └── Paywall.tsx               # Paywall for paid content
├── lib/                          # Business logic & utilities
│   ├── auth.ts                   # Auth functions (signup, login, logout)
│   ├── supabase.ts               # Browser-side Supabase client
│   ├── supabase-server.ts        # Server-side Supabase client
│   ├── books.ts                  # Book/chapter content loading
│   ├── stripe.ts                 # Stripe payment functions
│   ├── progress.ts               # Progress tracking functions
│   └── types.ts                  # TypeScript interfaces
├── content/books/                # Book content storage
│   ├── books.json                # Book metadata index
│   └── [book-slug]/              # Markdown chapter files
├── supabase/                     # Database configuration
│   └── schema.sql                # Full database schema with RLS
├── public/covers/                # Book cover images
└── middleware.ts                 # Session refresh middleware
```

## Key Files to Know

- `lib/types.ts` - Core TypeScript interfaces (Book, Chapter, User, UserProgress, Payment)
- `content/books/books.json` - Book metadata index (source of truth for available books)
- `supabase/schema.sql` - Database schema with tables, RLS policies, and triggers
- `app/globals.css` - Global styles and Tailwind customizations
- `.env.example` - Required environment variables template

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Code Conventions

### TypeScript

- **Strict mode is enabled** - All code must be type-safe
- Use explicit interfaces from `lib/types.ts`
- Import paths use `@/` alias (e.g., `@/lib/auth`)

### Naming Conventions

- **Components**: PascalCase (`BookCard.tsx`)
- **Functions/variables**: camelCase (`getCurrentUser`)
- **Database columns**: snake_case (`is_paid_member`)
- **API routes**: kebab-case (`create-checkout`)
- **File paths**: kebab-case (`forgot-password`)

### Component Patterns

**Client Components** (interactive):
```typescript
'use client'
import { useState, useEffect } from 'react'
// Use React hooks, browser APIs, event handlers
```

**Server Components** (default):
```typescript
// No 'use client' directive
// Can use async/await directly, access server resources
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

**API Routes**:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  // Business logic here
  return NextResponse.json({ success: true })
}
```

### Styling

- **Tailwind CSS only** - No component libraries
- **Mobile-first responsive**: Use `sm:`, `md:`, `lg:` breakpoints
- **Color scheme**: Blue-600 (primary), gray-* (secondary)
- **Font sizes**: 16px base on mobile, larger on desktop

### Error Handling

```typescript
try {
  const result = await someAsyncOperation()
  return { success: true, data: result }
} catch (error) {
  console.error('Operation failed:', error)
  return { success: false, error: 'User-friendly message' }
}
```

## Common Tasks

### Adding a New Book

1. Add book metadata to `content/books/books.json`:
```json
{
  "id": "unique-id",
  "title": "Book Title",
  "author": "Author Name",
  "slug": "book-slug",
  "description": "Book description",
  "coverImage": "/covers/book-slug.jpg",
  "publishedDate": "2024-01-01",
  "chapters": [
    {
      "id": "ch1",
      "chapterNumber": 1,
      "title": "Chapter Title",
      "slug": "chapter-1",
      "isFree": true,
      "filePath": "book-slug/chapter-1.md"
    }
  ],
  "totalChapters": 1,
  "published": true
}
```

2. Create markdown file at `content/books/book-slug/chapter-1.md`
3. Add cover image to `public/covers/book-slug.jpg`

### Adding a New Page

Create file in `app/` directory following Next.js App Router conventions:
- `app/new-page/page.tsx` - Creates `/new-page` route
- Use `layout.tsx` for shared layouts
- Dynamic routes use `[param]` syntax

### Adding API Endpoint

Create `route.ts` in `app/api/endpoint-name/`:
```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Success' })
}
```

### Working with Authentication

```typescript
// Client-side
import { getCurrentUser, signOut } from '@/lib/auth'
const user = await getCurrentUser()

// Server-side (API routes/Server Components)
import { createClient } from '@/lib/supabase-server'
const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

### Checking Paid Status

```typescript
// User object includes is_paid_member boolean
const user = await getCurrentUser()
if (user?.is_paid_member) {
  // Grant access
}
```

## Database Schema

**Core Tables**:
- `profiles` - User data (linked to auth.users via id)
- `books` - Book metadata
- `chapters` - Chapter metadata
- `user_progress` - Reading progress per user/chapter
- `payments` - Payment transaction history

**Important**: All tables have Row Level Security (RLS) enabled. Users can only access their own data for progress and payments.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Testing

- **No automated test suite** - Manual testing only
- **Test Stripe card**: `4242 4242 4242 4242`
- **Stripe test mode**: Use `pk_test_` and `sk_test_` keys
- Check Supabase dashboard for database state
- Check Stripe dashboard for payment events

## Important Patterns to Follow

### 1. Content is Git-Based

Book content lives in `content/books/` as markdown files. **Do not** create database entries for content - all book/chapter data comes from `books.json` and markdown files.

### 2. Freemium Access Control

- First chapter of each book (`isFree: true`) is always accessible
- Subsequent chapters require `is_paid_member = true`
- Paywall component handles gating in `ChapterPageClient.tsx`

### 3. Progress Tracking

Progress is tracked via `/api/track-progress` endpoint which updates the `user_progress` table. The dashboard reads this data to show completion status.

### 4. Server vs Client Components

- Pages that need interactivity: Use client components
- Pages that fetch data at request time: Use server components
- API routes are always server-side

### 5. Responsive Design

Always test on mobile viewports. Use Tailwind responsive prefixes:
- Mobile: Default styles
- Tablet: `md:` prefix
- Desktop: `lg:` prefix

## DO's

- Use TypeScript types from `lib/types.ts`
- Follow existing file structure patterns
- Handle loading and error states in client components
- Use Tailwind for all styling
- Keep API routes thin - put logic in `lib/` functions
- Use `@/` path alias for imports
- Commit meaningful changes with clear messages

## DON'Ts

- Don't create new config files without clear need
- Don't add new dependencies without consideration
- Don't bypass Supabase RLS policies
- Don't store sensitive data in client-side code
- Don't use inline styles (use Tailwind)
- Don't create empty test files
- Don't modify `supabase/schema.sql` without understanding RLS implications

## Deployment

Production deployment is on **Vercel**:
1. Push to GitHub triggers automatic deployment
2. Environment variables configured in Vercel dashboard
3. Stripe webhooks must point to production URL
4. Supabase redirect URLs must include production domain

## Quick Reference

| Task | Location |
|------|----------|
| Add book content | `content/books/books.json` + markdown files |
| Modify auth flow | `lib/auth.ts` + `app/auth/` pages |
| Change payment logic | `lib/stripe.ts` + `app/api/` routes |
| Update database schema | `supabase/schema.sql` (apply via Supabase dashboard) |
| Add shared component | `components/` directory |
| Add utility function | `lib/` directory |
| Modify navigation | `components/Navigation.tsx` |
| Update global styles | `app/globals.css` |

## Helpful Documentation

- `README.md` - Project overview and features
- `SETUP.md` - Detailed setup and deployment guide
- `ADDING_CONTENT.md` - Guide for adding books/chapters
- `FIXES_APPLIED.md` - History of bug fixes
- `BOOK_COVERS.md` - Image guidelines
- `VERCEL_DEPLOYMENT.md` - Deployment troubleshooting

---

Last updated: 2025-11-17
