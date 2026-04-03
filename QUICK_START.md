# CNOIRYA Platform - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Local Development Setup
```bash
# Clone the repository
git clone https://github.com/cnoirya/v0-cnoirya-platform-blueprint.git
cd v0-cnoirya-platform-blueprint

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Environment Variables Setup

Edit `.env.local` with your Supabase credentials (get from [https://supabase.com](https://supabase.com)):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
SUPABASE_JWT_SECRET=your-secret-key
POSTGRES_URL=postgresql://postgres:password@localhost:5432/postgres
```

---

## 👤 Create Your Admin Account

1. **Navigate to** [http://localhost:3000/login](http://localhost:3000/login)
2. **Sign up** with your email and password
3. **Confirm email** (check inbox or Supabase email logs)
4. **Make yourself admin:**
   - Open Supabase Dashboard
   - Go to Authentication > Users
   - Click your user
   - Edit "User Metadata"
   - Add: `{"is_admin": true}`
5. **Access admin panel** at [http://localhost:3000/admin-login](http://localhost:3000/admin-login)

---

## 🌐 Key URLs for Local Development

**Public Pages:**
- Homepage: [http://localhost:3000](http://localhost:3000)
- About: [http://localhost:3000/about](http://localhost:3000/about)
- Privacy: [http://localhost:3000/privacy](http://localhost:3000/privacy)
- Terms: [http://localhost:3000/terms](http://localhost:3000/terms)

**User Area:**
- Sign Up: [http://localhost:3000/login](http://localhost:3000/login)
- Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- Forgot Password: [http://localhost:3000/forgot-password](http://localhost:3000/forgot-password)

**Admin Area:**
- Admin Login: [http://localhost:3000/admin-login](http://localhost:3000/admin-login)
- Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)
- Vault Management: [http://localhost:3000/admin/vault](http://localhost:3000/admin/vault)
- Settings: [http://localhost:3000/admin/settings](http://localhost:3000/admin/settings)

---

## 💳 Configure Payments (NowPayments)

To enable real payments during development:

1. **Create NowPayments account** at [https://nowpayments.io](https://nowpayments.io)
2. **Get API credentials:**
   - API Key
   - IPN Secret
3. **Add to .env.local:**
   ```
   NOWPAYMENTS_API_KEY=your_api_key
   NOWPAYMENTS_IPN_SECRET=your_ipn_secret
   ```
4. **Set IPN URL in NowPayments dashboard:**
   ```
   http://localhost:3000/api/webhooks/nowpayments
   ```
5. **Use test mode first** before going live

---

## 🗄️ Database Setup

The database schema is automatically created. To manually run migrations:

```bash
# Execute the schema script in your Supabase SQL editor:
# Copy contents of scripts/001_create_schema.sql
# Paste into Supabase > SQL Editor
# Run
```

This creates:
- `profiles` - User accounts
- `subscriptions` - Active subscriptions
- `payments` - Payment history
- `wallet` - User wallet balances
- `content` - Vault items
- `messages` - Direct messages
- `ppv_purchases` - PPV sales
- And more...

---

## 🎨 Customization Quick Reference

### Change Brand Name
Search for "CNOIRYA" and replace:
- `app/layout.tsx`
- `components/navigation.tsx`
- `components/footer.tsx`
- `components/landing/hero.tsx`

### Change Pricing Tiers
Edit in `/admin/settings`:
- Update tier names
- Set monthly prices in USDT
- Add tier descriptions
- Configure multi-month bundles

### Change Colors (Editorial Theme)
Edit `app/globals.css`:
```css
--foreground: 0 0% 0%;      /* Black */
--background: 0 0% 100%;    /* White */
--muted-foreground: 0 0% 40%;  /* Gray */
--border: 0 0% 90%;         /* Light gray */
```

### Add Your Logo
Replace or update logo image:
- `public/logo.png` - Site logo
- `public/favicon.ico` - Browser tab icon

---

## 🧪 Testing the Platform

### User Flow
1. Go to home page
2. Click "Join" button
3. Sign up with email/password
4. Verify email
5. Access dashboard
6. Browse Vault content
7. Subscribe to tier
8. Make payment (test mode)
9. Access premium content

### Admin Flow
1. Go to `/admin-login`
2. Login with admin credentials
3. View dashboard analytics
4. Upload content to Vault
5. Configure pricing
6. View subscriber list
7. Check payment history

### Payment Testing
Use NowPayments sandbox credentials:
- Test cryptocurrency addresses
- Process test transactions
- Verify webhook delivery
- Check payment status updates

---

## 📱 Mobile Access

The platform is fully responsive. Test on mobile:
```bash
# Get your local IP
ipconfig getifaddr en0  # macOS
hostname -I             # Linux

# Access from phone on same network
http://YOUR_IP:3000
```

---

## 🐛 Debugging Tips

### Check Server Logs
```bash
# Terminal where you ran `npm run dev`
# Look for [v0] debug messages or errors
```

### Check Browser Console
- Right-click > Inspect > Console tab
- Look for JavaScript errors
- Check network requests

### Supabase Debugging
- Open Supabase Dashboard
- Check Database logs
- Check Authentication logs
- Review API requests

### Database Issues
- Verify table creation: SQL Editor > Run schema script
- Check Row Level Security policies
- Verify user has proper permissions

---

## 📚 Full Documentation

- **Setup & Deployment:** See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Launch Checklist:** See [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
- **Project Overview:** See [README.md](./README.md)

---

## ⚡ Common Issues & Fixes

### "auth.uid() is null" Error
- User hasn't confirmed email yet
- Check email inbox for verification link
- Verify in Supabase: Users > email_confirmed column

### "RLS policy violation"
- User doesn't have proper permissions
- Check Row Level Security policies in Supabase
- Verify user is authenticated

### Payment Not Processing
- Check NowPayments API key is correct
- Verify IPN secret configured
- Check webhook logs in NowPayments dashboard
- Test with sandbox API first

### "Supabase URL is required"
- .env.local not loaded
- Restart dev server: `npm run dev`
- Verify environment variables are set

---

## 🚀 Ready to Deploy?

When ready to go live:

1. **Follow DEPLOYMENT.md** for detailed setup
2. **Complete LAUNCH_CHECKLIST.md** items
3. **Push to GitHub**
4. **Deploy via Vercel**
5. **Add production environment variables**
6. **Monitor analytics**

Good luck! 🎉
