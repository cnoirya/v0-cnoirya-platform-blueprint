# CNOIRYA Platform - Deployment & Setup Guide

## Overview

The CNOIRYA platform is a Next.js 16 application with Supabase backend integration, featuring a membership system, content management, and payment processing through NowPayments.

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account (free tier available at supabase.com)
- NowPayments merchant account (for crypto payments)
- Vercel account (optional, for hosting)

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd v0-cnoirya-platform-blueprint
npm install  # or yarn, pnpm, bun
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Fill in your values:

- **Supabase**: Get from your Supabase dashboard → Settings → API
- **NowPayments**: Get API key from your NowPayments account dashboard
- **Redirect URLs**: Update for your domain

### 3. Database Setup

The database schema is automatically applied via the migration script in `scripts/001_create_schema.sql`. 

**If using Supabase locally via Docker:**
```bash
docker run -d \
  --name supabase-local \
  -p 5432:5432 \
  supabase/postgres:latest
```

**To apply the schema:**
- Use the Supabase dashboard → SQL Editor, paste the contents of `scripts/001_create_schema.sql`
- OR use the Supabase CLI: `supabase db push`

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Test Authentication

- Sign up page: `http://localhost:3000/auth/signup`
- Login page: `http://localhost:3000/auth/login`
- Admin dashboard: `http://localhost:3000/admin` (requires admin role)
- Member dashboard: `http://localhost:3000/dashboard`

## Production Deployment

### Option A: Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git remote add origin <github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Framework: Next.js (auto-detected)

3. **Configure Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add all variables from `.env.example`
   - Make sure `NEXT_PUBLIC_*` variables are marked as "Exposed to Browser"

4. **Deploy**
   - Vercel automatically builds and deploys on push to main
   - Update `SUPABASE_REDIRECT_URL` to your Vercel domain

### Option B: Manual Deployment to Any Server

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set environment variables on your server**
   - Create `.env.production.local` with all required variables
   - Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set

3. **Start the server**
   ```bash
   npm start
   ```

4. **Reverse proxy setup** (Nginx example)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Key Features & Setup

### 1. Authentication (Supabase Auth)

- Email/password authentication
- Automatic profile creation on signup
- Session management via middleware
- Protected routes for authenticated users

**Auth pages:**
- Sign up: `/auth/signup`
- Login: `/auth/login`
- Error: `/auth/error`

### 2. Admin Dashboard

- Dashboard analytics: `/admin`
- Content management: `/admin/content`
- Vault management: `/admin/vault`
- Subscriber management: `/admin/subscribers`
- Pricing settings: `/admin/settings`

**Admin access:** Users must have `is_admin = true` in their profile (set during signup in user metadata)

### 3. Payment Processing (NowPayments)

**Supported cryptocurrencies:**
- Bitcoin (BTC)
- Ethereum (ETH)
- USDT (Tether)
- Litecoin (LTC)
- And many others

**Payment types:**
- Subscriptions (monthly recurring)
- PPV purchases (per video)
- Tips and custom amounts
- Wallet top-ups

**Webhook handling:**
- `/api/webhooks/nowpayments` - Receives payment status updates
- Automatic subscription activation on confirmed payment
- Wallet balance updates

### 4. Content Management

**Vault system:**
- Upload photos, videos, and galleries
- Tier-based content access (free, devotee, chosen, inner-circle)
- PPV (Pay-Per-View) pricing option
- Automatic thumbnail generation

**Content types:**
- Photo galleries
- Videos
- Audio files
- Articles

### 5. Subscription Tiers

Three main subscription tiers (configurable in admin):
- **Devotee**: Basic access to content
- **Chosen**: Enhanced access + messaging
- **Inner Circle**: VIP access + priority support + exclusive content

## API Reference

### Authentication Endpoints

```
POST   /api/auth/signup        - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user
GET    /api/user               - Get current user profile
```

### Payment Endpoints

```
POST   /api/payments/create    - Create payment order
GET    /api/payments/status    - Check payment status
POST   /api/webhook/nowpayments - NowPayments webhook handler
```

### Subscription Endpoints

```
POST   /api/subscription       - Create/manage subscription
GET    /api/subscription       - Get current subscription
```

### Wallet Endpoints

```
POST   /api/wallet/topup       - Add funds to wallet
GET    /api/wallet/balance     - Get wallet balance
```

## Database Schema

Key tables:
- **profiles** - User accounts (extends auth.users)
- **subscriptions** - Active subscriptions
- **payments** - Payment history
- **wallet_transactions** - Wallet ledger
- **content** - Media files and posts
- **messages** - Direct messages between users
- **likes** - Content likes
- **comments** - Content comments
- **ppv_purchases** - Per-video purchase records

All tables have Row Level Security (RLS) policies for data privacy.

## Security Best Practices

1. **Never commit `.env.local`** - Use `.gitignore`
2. **Use HTTPS in production** - Required for Supabase
3. **Enable RLS on all database tables** - Already configured
4. **Validate user input** - All forms use Zod validation
5. **Secure API endpoints** - Auth middleware protects sensitive routes
6. **NowPayments IPN Secret** - Verify webhook signatures server-side

## Troubleshooting

### Issue: "NEXT_PUBLIC_SUPABASE_URL not found"
**Solution:** Check `.env.local` contains the variable and restart dev server

### Issue: Database migrations not applying
**Solution:** 
- Ensure Supabase project is active
- Run migration script in SQL Editor
- Check for RLS policy conflicts

### Issue: Payments not processing
**Solution:**
- Verify NowPayments API key is correct
- Check IPN webhook URL in NowPayments dashboard
- Review webhook logs at `/admin/webhook-logs`

### Issue: Email not confirming
**Solution:**
- Update `SUPABASE_REDIRECT_URL` in environment
- Check email provider settings in Supabase Auth
- Verify SMTP configuration if using SendGrid

## Monitoring & Maintenance

### Regular Tasks

1. **Check payment status** - Daily review of pending payments
2. **Monitor disk usage** - Vault storage can grow quickly
3. **Review access logs** - Security audit via Supabase dashboard
4. **Update dependencies** - Run `npm update` monthly
5. **Database backups** - Supabase handles backups automatically

### Performance Optimization

- Enable image optimization in `/app/layout.tsx`
- Use CDN for media files (configure in Supabase Storage)
- Implement caching for frequently accessed content
- Monitor API response times

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **NowPayments Docs**: https://nowpayments.io/documentation
- **Project Issues**: Create issue in GitHub repository

## License

Proprietary - CNOIRYA Platform © 2026
