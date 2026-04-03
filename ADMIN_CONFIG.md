# CNOIRYA Platform - Admin Configuration Guide

## Initial Setup for Creators

Once your platform is deployed, follow this guide to configure everything.

---

## 1. Create Your Admin Account

### Step 1: Sign Up
1. Go to your platform homepage
2. Click "Join" or go to `/login`
3. Enter your email and create a password
4. Verify your email (check inbox)

### Step 2: Enable Admin Access
1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **Users**
4. Find your user in the list
5. Click on the user
6. Scroll to **User Metadata**
7. Click **Edit JSON**
8. Add: 
```json
{
  "is_admin": true
}
```
9. Click **Update**

### Step 3: Access Admin Panel
1. Go to `/admin-login`
2. Enter your email and password
3. You now have full admin access

---

## 2. Configure Subscription Pricing

1. Go to **Admin** → **Settings**
2. Look for **Subscription Pricing** section
3. For each tier (Standard, Premium, VIP):
   - **Tier Name** - e.g., "Standard", "Premium", "VIP"
   - **Monthly Price** - in USDT (e.g., 9.99)
   - **Description** - What this tier includes
4. Click **Update Pricing**

Example pricing structure:
```
Standard Tier
  Price: $9.99/month
  Description: Access to selected content and messages

Premium Tier
  Price: $19.99/month
  Description: Full vault access and priority responses

VIP Tier
  Price: $49.99/month
  Description: Exclusive content, 1-on-1 calls, custom requests
```

### Add Multi-Month Bundles
1. Still in **Settings**
2. Scroll to **Multi-Month Bundles**
3. Add bundles like:
   - 3-Month Pass: $24.99 (save 17%)
   - 6-Month Pass: $44.99 (save 25%)
   - Annual Pass: $79.99 (save 33%)
4. Click **Add Bundle**

---

## 3. Upload Content to Vault

1. Go to **Admin** → **Vault**
2. Click **Upload Content**
3. Select content type:
   - Photo Set
   - Video
   - Audio
   - Document
4. Upload file
5. Add details:
   - **Title** - Content name
   - **Description** - What it includes
   - **Tier** - Which subscription tiers can access:
     - Standard (all subscribers)
     - Premium (Premium & VIP only)
     - VIP (VIP only)
     - Exclusive (only via custom offer)
6. Set pricing for PPV (if desired):
   - Leave blank for included with subscription
   - Or set price (e.g., $4.99) for pay-per-view
7. Click **Publish**

---

## 4. Set Up Messaging Templates

1. Go to **Admin** → **Messages**
2. Create auto-response templates for:
   - **Welcome Message** - First message to new subscribers
   - **FAQ** - Frequently asked questions
   - **Custom Request** - How to request custom content
3. These can be sent to subscribers automatically

---

## 5. Configure Email Settings

Contact support to set up transactional emails:
- Subscription confirmations
- Password reset emails
- Payment receipts
- PPV purchase confirmations

---

## 6. Set Up Payment Processing

### Via NowPayments (Cryptocurrency)
1. Create account at [https://nowpayments.io](https://nowpayments.io)
2. Get your API Key and IPN Secret
3. Configure which cryptocurrencies to accept:
   - Bitcoin (BTC)
   - Ethereum (ETH)
   - Tether (USDT)
   - Other options available
4. Set payment success notifications
5. Your platform is ready to accept crypto payments

### Via Stripe (Coming Soon)
- Credit/debit card payments
- Coming in future update

---

## 7. Customize Branding

### Update Logo
- Replace `/public/logo.png` with your logo
- Recommended: 200x200px PNG

### Update Colors
1. Edit `app/globals.css`
2. Modify color theme variables:
```css
--foreground: 0 0% 0%;      /* Main text color */
--background: 0 0% 100%;    /* Background color */
--muted-foreground: 0 0% 40%;  /* Secondary text */
--border: 0 0% 90%;         /* Border color */
```

### Update Copy
Search and replace "CNOIRYA" with your brand name throughout:
- Homepage
- Email templates
- Footer
- Navigation

---

## 8. Set Analytics Goals

Track these key metrics on your dashboard:
- **Total Revenue** - Sum of all payments received
- **Active Subscribers** - Current subscription count by tier
- **Content Views** - How many times content accessed
- **Messages** - Subscriber engagement
- **New Signups** - Growth tracking
- **Churn Rate** - Subscription cancellations

---

## 9. Configure Notifications

### Browser Notifications (Optional)
- New subscriber alerts
- Payment received alerts
- Custom message requests
- Content upload reminders

### Email Notifications (Optional)
- Daily/weekly revenue summaries
- Subscriber action alerts
- Payment failures
- Support requests

---

## 10. Set Up SEO & Social

### Homepage SEO
Edit `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'CNOIRYA - Premium Content',
  description: 'Join CNOIRYA community for exclusive content...',
  keywords: 'creator, content, exclusive, membership',
}
```

### Social Media Links
Update in `components/footer.tsx`:
- Instagram
- Twitter/X
- TikTok
- OnlyFans
- Other platforms

---

## 11. Create Content Calendar

Plan your content releases:
- Monday: Photo sets
- Wednesday: Video content
- Friday: PPV special
- Sunday: Behind-the-scenes

Use calendar view in Admin Dashboard to schedule content.

---

## 12. Subscriber Management

### View Subscribers
1. Go to **Admin** → **Subscribers**
2. See all subscribers with:
   - Subscription tier
   - Renewal date
   - Total spent
   - Last activity

### Send Bulk Messages
1. Select subscribers by tier
2. Compose message
3. Send broadcast
4. Track open/read rates

### Handle Support Requests
1. Go to **Admin** → **Messages**
2. Respond to subscriber inquiries
3. Use templates for quick responses
4. Mark as resolved when done

---

## 13. Monitor Analytics

### Daily Dashboard Review
1. Check revenue from yesterday
2. Review new subscriber count
3. Monitor top performing content
4. Check pending payments

### Weekly Reports
- Revenue trends
- Subscriber growth
- Content performance
- Engagement metrics

### Monthly Analysis
- Revenue trends month-over-month
- Subscriber churn analysis
- Content performance ranking
- Audience demographics

---

## 14. Troubleshooting

### Payment Issues
- Check NowPayments IPN settings
- Verify webhook URL is correct
- Review payment logs
- Test with small transaction

### Subscriber Can't Access Content
- Verify subscription is active
- Check content tier permissions
- Confirm email verification
- Reset user session

### Slow Platform
- Check Supabase query performance
- Review large file uploads
- Optimize images/videos
- Check browser cache

### Email Not Sending
- Verify email configuration
- Check spam folder
- Review email service status
- Check error logs

---

## 15. Security Checklist

Before launching publicly:
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set strong admin password
- [ ] Enable 2FA on Supabase
- [ ] Review privacy settings
- [ ] Configure GDPR compliance
- [ ] Set up backup system
- [ ] Enable error tracking
- [ ] Enable analytics

---

## 16. Launch Day Checklist

- [ ] All pricing configured
- [ ] Initial content uploaded
- [ ] Logo and branding updated
- [ ] Admin account secured
- [ ] Payment processing tested
- [ ] Email templates configured
- [ ] Analytics tracking enabled
- [ ] Social links added
- [ ] DNS configured (if custom domain)
- [ ] Content calendar created

---

## Support

For configuration help:
- Review [QUICK_START.md](./QUICK_START.md)
- Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- Review [API.md](./API.md)
- Contact support@cnoirya.com

**Your platform is now ready to earn! 🚀**
