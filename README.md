# CNOIRYA Platform

A modern membership and content management platform built with Next.js 16, Supabase, and NowPayments integration. Creators can manage subscribers, monetize content, and build community with tiered access levels and cryptocurrency payments.

## Features

✨ **Creator Features**
- Admin dashboard with analytics and revenue tracking
- Content vault with multi-tier access control
- Subscriber management and messaging
- Pay-Per-View (PPV) and subscription monetization
- Cryptocurrency payment processing (BTC, ETH, USDT, etc.)
- Live streaming coordination and custom order management

👥 **Member Features**
- User dashboard with subscription management
- Access to tiered content (devotee, chosen, inner-circle)
- Wallet system with top-up functionality
- Direct messaging with creator
- Like and comment on content
- PPV purchase history

## Tech Stack

- **Frontend**: Next.js 16 (React 19, TypeScript)
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth
- **Payments**: NowPayments (cryptocurrency)
- **Hosting**: Vercel (recommended)

## Quick Start

### Local Development

1. **Clone and install**
   ```bash
   git clone <repository>
   cd v0-cnoirya-platform-blueprint
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase and NowPayments credentials
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions including:
- Environment variables configuration
- Supabase database setup
- NowPayments integration
- Production deployment options
- Troubleshooting guide

## Project Structure

```
├── app/
│   ├── admin/              # Admin dashboard pages
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Member dashboard
│   ├── api/                # API routes and webhooks
│   ├── about/              # Static pages
│   ├── privacy/
│   ├── terms/
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
│   ├── admin/              # Admin-specific components
│   ├── dashboard/          # Dashboard components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utilities and helpers
│   ├── supabase/           # Supabase clients
│   └── utils.ts            # Shared utilities
├── scripts/                # Database migrations
└── middleware.ts           # Auth middleware
```

## Key Pages

**Public:**
- `/` - Homepage
- `/about` - About page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

**Authentication:**
- `/auth/signup` - Register account
- `/auth/login` - Login
- `/auth/error` - Auth errors

**Member Area:**
- `/dashboard` - Member dashboard
- `/dashboard/messages` - Messaging
- `/dashboard/vault` - Content access

**Admin Area:**
- `/admin` - Dashboard & analytics
- `/admin/vault` - Content management
- `/admin/subscribers` - Subscriber list
- `/admin/settings` - Pricing configuration
- `/admin/messages` - Message inbox

## Database

The platform uses Supabase PostgreSQL with Row Level Security (RLS). Key tables:
- `profiles` - User accounts
- `subscriptions` - Active subscriptions
- `payments` - Payment history
- `content` - Media and posts
- `messages` - Direct messages
- `likes` - Content interactions
- `ppv_purchases` - Per-video sales

All tables automatically sync with authentication state for security.

## Payments

NowPayments integration handles cryptocurrency transactions:
- **Subscription payments** - Monthly recurring
- **PPV purchases** - One-time content sales
- **Tips and donations** - Custom amounts
- **Wallet top-ups** - Pre-funded account balance

Webhook callbacks automatically update subscription status and wallet balances.

## Deployment

### Recommended: Vercel

1. Push to GitHub
2. Import in Vercel dashboard
3. Add environment variables
4. Deploy with one click

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Alternative: Self-hosted

Any Node.js hosting service works. See [DEPLOYMENT.md](./DEPLOYMENT.md) for examples.

## Development

Built with v0 and updated via chat. Continue development:

[Open in v0 →](https://v0.app/chat/projects/prj_B6WE3w0U7fdG341ZgKt4h538qLP6)

## Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Setup and deployment
- [API Reference](./DEPLOYMENT.md#api-reference) - API endpoints
- [Security](./DEPLOYMENT.md#security-best-practices) - Best practices

## Support

For issues and questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
2. Review Supabase documentation
3. Check NowPayments integration docs

## License

Proprietary - CNOIRYA Platform © 2026
