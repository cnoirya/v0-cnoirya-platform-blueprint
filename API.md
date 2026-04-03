# CNOIRYA Platform - API Reference

## Authentication Endpoints

### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "full_name": "User Name"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "full_name": "User Name"
    }
  },
  "session": {
    "access_token": "token",
    "refresh_token": "token"
  }
}
```

---

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "token",
    "refresh_token": "token"
  }
}
```

---

### Logout
```http
POST /api/auth/logout
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent"
}
```

---

### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "password": "new_password"
}
```

**Response:**
```json
{
  "message": "Password reset successfully"
}
```

---

## User Endpoints

### Get Current User
```http
GET /api/user
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "User Name",
  "avatar_url": "https://...",
  "is_admin": false,
  "created_at": "2026-04-03T10:00:00Z"
}
```

---

### Update User Profile
```http
POST /api/user
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "full_name": "New Name",
  "avatar_url": "https://example.com/avatar.jpg",
  "bio": "User biography"
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "New Name",
  "avatar_url": "https://...",
  "updated_at": "2026-04-03T11:00:00Z"
}
```

---

## Subscription Endpoints

### Get Subscription Info
```http
GET /api/subscription
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "user_id": "uuid",
  "tier": "premium",
  "status": "active",
  "current_period_start": "2026-04-01",
  "current_period_end": "2026-05-01",
  "cancel_at_period_end": false,
  "amount": 2999,
  "currency": "USDT"
}
```

---

### Create/Update Subscription
```http
POST /api/subscription
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "tier": "premium",
  "payment_method": "nowpayments"
}
```

**Response:**
```json
{
  "subscription_id": "sub_123",
  "status": "pending",
  "payment_url": "https://nowpayments.io/payment/?iid=123"
}
```

---

## Payment Endpoints

### Create Payment Intent
```http
POST /api/payments/create
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "amount": 2999,
  "currency": "USDT",
  "type": "subscription",
  "tier": "premium"
}
```

**Response:**
```json
{
  "payment_id": "pay_123",
  "invoice_id": "iid_123",
  "status": "waiting",
  "payment_url": "https://nowpayments.io/payment/?iid=123",
  "crypto_amounts": {
    "BTC": "0.0001",
    "ETH": "0.002",
    "USDT": "2.99"
  }
}
```

---

### Check Payment Status
```http
GET /api/payments/status?payment_id=pay_123
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "payment_id": "pay_123",
  "status": "confirmed",
  "amount": 2999,
  "currency": "USDT",
  "confirmed_at": "2026-04-03T10:30:00Z"
}
```

---

## Wallet Endpoints

### Top Up Wallet
```http
POST /api/wallet/topup
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "amount": 5000,
  "currency": "USDT"
}
```

**Response:**
```json
{
  "topup_id": "topup_123",
  "status": "pending",
  "amount": 5000,
  "currency": "USDT",
  "payment_url": "https://nowpayments.io/payment/?iid=456"
}
```

---

## Webhook Endpoints

### NowPayments IPN Webhook
```http
POST /api/webhooks/nowpayments
Content-Type: application/json

{
  "payment_id": 123456,
  "invoice_id": "iid_123",
  "status": "confirmed",
  "outcome": "completed",
  "amount": "2.99",
  "amount_usd": "2.99"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment processed"
}
```

---

## Error Responses

All endpoints return consistent error format:

```json
{
  "error": "error_code",
  "message": "Human readable error message",
  "status": 400
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad request (invalid input)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `409` - Conflict (already exists)
- `500` - Server error

### Common Error Codes
- `INVALID_CREDENTIALS` - Wrong email/password
- `EMAIL_EXISTS` - Email already registered
- `INVALID_TOKEN` - Expired or invalid token
- `PAYMENT_FAILED` - Payment processing failed
- `RLS_VIOLATION` - Row Level Security violation
- `NOT_FOUND` - Resource not found
- `INTERNAL_ERROR` - Server error

---

## Authentication

All authenticated endpoints require the `Authorization` header:

```
Authorization: Bearer {access_token}
```

Get `access_token` from login or signup response. Token expires after 1 hour; use `refresh_token` to get a new one.

---

## Rate Limiting

API endpoints have rate limits:
- **Login/Signup:** 5 requests per minute per IP
- **Payment:** 10 requests per minute per user
- **General:** 60 requests per minute per user

Rate limit info in response headers:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1649072400
```

---

## Testing

### Using cURL
```bash
# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get user (replace TOKEN with access_token)
curl -X GET http://localhost:3000/api/user \
  -H "Authorization: Bearer TOKEN"
```

### Using JavaScript/Fetch
```javascript
// Sign up
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
    full_name: 'Test User'
  })
});

const { user, session } = await response.json();
localStorage.setItem('token', session.access_token);
```

---

## Pagination

Endpoints that return lists support pagination:

```http
GET /api/messages?page=1&limit=20
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "data": [ { ... }, { ... } ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

---

## Filtering & Sorting

Some endpoints support filtering and sorting:

```http
GET /api/payments?status=confirmed&sort=-created_at
Authorization: Bearer {access_token}
```

Check endpoint documentation for available filters and sort options.

---

## Versioning

Current API version: **v1**

Future breaking changes will be in `/api/v2/`, `/api/v3/`, etc.

---

## Support

For API issues:
1. Check this documentation
2. Review error messages
3. Check Supabase logs
4. Check application error tracking
5. Contact support@cnoirya.com
