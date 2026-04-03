# CNOIRYA Platform - Launch Checklist

## Pre-Launch Tasks (Complete Before Going Live)

### 1. Supabase Configuration ✓
- [x] Environment variables set (SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
- [ ] Run database schema: `scripts/001_create_schema.sql`
- [ ] Verify all tables created successfully
- [ ] Configure Row Level Security policies
- [ ] Set up authentication email template
- [ ] Configure password reset email template

### 2. NowPayments Integration
- [ ] Create NowPayments Business Account at https://nowpayments.io
- [ ] Get API Key and IPN secret
- [ ] Add to environment variables:
  ```
  NOWPAYMENTS_API_KEY=your_api_key
  NOWPAYMENTS_IPN_SECRET=your_ipn_secret
  ```
- [ ] Configure IPN webhook URL: `https://yourdomain.com/api/webhooks/nowpayments`
- [ ] Test payment flow in sandbox mode
- [ ] Enable production mode

### 3. Email Configuration
- [ ] Set up transactional email service (SendGrid, Resend, Mailgun, etc.)
- [ ] Configure forgot password emails
- [ ] Configure subscription confirmation emails
- [ ] Configure payment receipt emails
- [ ] Add email templates

### 4. Create Admin Account
- [ ] Sign up at `/login`
- [ ] Go to Supabase Dashboard > Authentication > Users
- [ ] Find your user and edit user metadata
- [ ] Add: `"is_admin": true`
- [ ] Refresh and login to `/admin-login`

### 5. Domain Setup
- [ ] Purchase domain (or use Vercel subdomain)
- [ ] Configure DNS records
- [ ] Update NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL to production domain
- [ ] Update NEXT_PUBLIC_APP_URL environment variable

### 6. Deployment
- [ ] Push code to GitHub repository
- [ ] Connect Vercel project
- [ ] Add all environment variables to Vercel
- [ ] Deploy to production
- [ ] Run smoke tests on live site

### 7. Content Preparation
- [ ] Create initial Vault content items
- [ ] Set pricing tiers (Standard, Premium, VIP)
- [ ] Configure subscription features per tier
- [ ] Set up initial messaging templates
- [ ] Create terms and privacy pages (Already created but customize)

### 8. Security Review
- [ ] Verify HTTPS enabled
- [ ] Check CORS configuration
- [ ] Verify sensitive endpoints require authentication
- [ ] Review Row Level Security policies
- [ ] Enable rate limiting on API routes
- [ ] Set up monitoring/error tracking (Sentry recommended)

### 9. Testing
- [ ] Test user signup flow
- [ ] Test email verification
- [ ] Test forgot password flow
- [ ] Test subscription checkout with real payment
- [ ] Test admin dashboard access
- [ ] Test content upload and access control
- [ ] Test messaging system
- [ ] Test wallet topup

### 10. Analytics & Monitoring
- [ ] Set up analytics (Vercel Analytics, Plausible, or similar)
- [ ] Set up error tracking (Sentry or similar)
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation

---

## Configuration Files

### Environment Variables (.env.local or Vercel)
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret

# Database
POSTGRES_URL=postgresql://user:password@host/database
DATABASE_URL=$POSTGRES_URL

# NowPayments
NOWPAYMENTS_API_KEY=your_api_key
NOWPAYMENTS_IPN_SECRET=your_ipn_secret

# App Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://yourdomain.com/auth/callback
```

---

## Critical API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### User Management
- `GET /api/user` - Get current user profile
- `POST /api/user` - Update user profile
- `GET /api/user/subscription` - Get subscription status

### Payments
- `POST /api/payments/create` - Create payment intent
- `GET /api/payments/status` - Check payment status
- `POST /api/webhook/nowpayments` - NowPayments webhook

### Wallet
- `POST /api/wallet/topup` - Top up wallet balance

### Subscriptions
- `GET /api/subscription` - Get subscription info
- `POST /api/subscription` - Create/update subscription

---

## Key Features Ready for Launch

✓ **User Features:**
- Authentication (signup, login, forgot password)
- Dashboard with subscription management
- Content vault with tiered access
- Direct messaging
- Like and comment functionality
- Wallet system
- PPV purchases

✓ **Admin Features:**
- Dashboard with analytics
- Content management (Vault)
- Subscriber management
- Pricing configuration
- Message management
- Real-time earnings tracking
- Revenue charts

✓ **Editorial Design:**
- Minimal, clean interface
- Helvetica Neue typography
- Black on white color scheme
- Sharp corners (0 border radius)
- Professional layout
- Mobile responsive

---

## Post-Launch Tasks

- [ ] Monitor error tracking daily
- [ ] Check payment processing
- [ ] Review user feedback
- [ ] Optimize performance based on analytics
- [ ] Plan content roadmap with creator
- [ ] Schedule promotional activities
- [ ] Set up customer support channels

---

## Support & Troubleshooting

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions and troubleshooting.

For issues:
1. Check error logs in Vercel
2. Review Supabase logs
3. Check NowPayments API status
4. Review CORS configuration
5. Verify environment variables are set correctly
6. Check database schema is fully created

---

## Launch Sign-Off

- Developer: _________________ Date: _______
- QA Verification: _________________ Date: _______
- Creator Approval: _________________ Date: _______

Ready to launch! 🚀
