# ⚡ First 30 Minutes - Quick Checklist

Get your CNOIRYA platform running in 30 minutes or less.

---

## ⏱️ Minutes 1-5: Setup

```bash
# Clone the repository
git clone https://github.com/cnoirya/v0-cnoirya-platform-blueprint.git
cd v0-cnoirya-platform-blueprint

# Install dependencies
npm install
```

---

## ⏱️ Minutes 6-10: Configure Environment

1. Copy environment template:
```bash
cp .env.example .env.local
```

2. Get Supabase credentials:
   - Go to https://supabase.com
   - Create free account (if needed)
   - Create new project
   - Go to Settings > API
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`
   - Copy **JWT Secret** → `SUPABASE_JWT_SECRET`

3. Edit `.env.local` and paste these 4 values

---

## ⏱️ Minutes 11-15: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

You should see the CNOIRYA homepage! 🎉

---

## ⏱️ Minutes 16-20: Create Admin Account

1. Click **Join** on homepage
2. Enter email: `admin@example.com`
3. Enter password: `SecurePassword123`
4. Click **Sign Up**
5. **Check your email** for verification link (or check terminal for dev link)
6. Click verification link
7. You're now logged in to dashboard

---

## ⏱️ Minutes 21-25: Make Yourself Admin

1. Open https://app.supabase.com
2. Select your project
3. Go to **Authentication** > **Users**
4. Find `admin@example.com`
5. Click the user
6. Scroll down to **User Metadata**
7. Click **Edit JSON**
8. Replace `{}` with:
```json
{
  "is_admin": true
}
```
9. Click **Update**

---

## ⏱️ Minutes 26-30: Access Admin Panel

1. Go to http://localhost:3000/admin-login
2. Enter: `admin@example.com` / `SecurePassword123`
3. You're now in the **Admin Dashboard**! 🎊

---

## ✅ Success! You Now Have:

- [x] Local development environment running
- [x] Admin account created
- [x] Access to admin dashboard
- [x] Supabase database connected
- [x] Full platform operational

---

## 🎯 What to Try Next

### In Admin Dashboard:
1. Click **Settings** - Configure pricing tiers
2. Click **Vault** - Upload test content
3. Click **Dashboard** - See analytics

### Test the Platform:
1. Open new incognito/private browser
2. Go to http://localhost:3000
3. Click **Join**
4. Sign up with different email
5. Try subscribing to a tier
6. See content access control

### Review Your Code:
1. Open `app/page.tsx` - Homepage
2. Open `app/admin/page.tsx` - Dashboard
3. Open `app/login/page.tsx` - Login page
4. See how it all works!

---

## 🆘 Stuck? Quick Fixes

### "Can't find verification email"
- Check terminal where `npm run dev` is running
- Look for verification link in logs
- Or check spam folder

### "User metadata edit not working"
- Refresh the Supabase page
- Try logging out and back in
- Clear browser cache

### "Admin login not working"
- Make sure user metadata has `is_admin: true`
- Make sure you verified your email
- Try different browser/incognito

### "App not loading at localhost:3000"
- Make sure `npm run dev` is still running
- Check terminal for errors
- Try `npm run dev` again

### "Environment variables not working"
- Restart dev server after editing `.env.local`
- Make sure you saved the file
- Check there are no extra spaces or quotes

---

## 📚 Read Next

After these 30 minutes, read:

1. **[QUICK_START.md](./QUICK_START.md)** - Full setup guide with all details
2. **[ADMIN_CONFIG.md](./ADMIN_CONFIG.md)** - How to configure everything
3. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production

---

## 🚀 You Did It!

Your CNOIRYA platform is now running locally and ready to customize.

**Next step: Deploy to Vercel** (see DEPLOYMENT.md)

---

*Time elapsed: ~30 minutes | Status: ✅ Ready to develop*
