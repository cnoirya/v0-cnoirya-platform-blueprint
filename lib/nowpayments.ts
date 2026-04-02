/**
 * NOWPayments API Integration
 * 
 * To set up NOWPayments:
 * 1. Create an account at https://nowpayments.io
 * 2. Go to Store Settings and create a new API key
 * 3. Add your API key to environment variables as NOWPAYMENTS_API_KEY
 * 4. Configure your IPN (Instant Payment Notification) callback URL
 * 
 * Documentation: https://documenter.getpostman.com/view/7907941/S1a32n38
 */

const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1'

interface CreatePaymentParams {
  price_amount: number
  price_currency: string
  pay_currency: string
  order_id?: string
  order_description?: string
  ipn_callback_url?: string
}

interface PaymentResponse {
  payment_id: string
  payment_status: string
  pay_address: string
  pay_amount: number
  pay_currency: string
  price_amount: number
  price_currency: string
  order_id: string
  order_description: string
  created_at: string
  updated_at: string
  expiration_estimate_date: string
}

interface PaymentStatus {
  payment_id: string
  payment_status: 'waiting' | 'confirming' | 'confirmed' | 'sending' | 'partially_paid' | 'finished' | 'failed' | 'refunded' | 'expired'
  pay_address: string
  pay_amount: number
  actually_paid: number
  pay_currency: string
  price_amount: number
  price_currency: string
  order_id: string
  order_description: string
  created_at: string
  updated_at: string
}

class NOWPaymentsClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${NOWPAYMENTS_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'NOWPayments API error')
    }

    return response.json()
  }

  /**
   * Get API status
   */
  async getStatus(): Promise<{ message: string }> {
    return this.request('/status')
  }

  /**
   * Get available currencies
   */
  async getCurrencies(): Promise<{ currencies: string[] }> {
    return this.request('/currencies')
  }

  /**
   * Get minimum payment amount for a currency
   */
  async getMinimumPaymentAmount(currencyFrom: string, currencyTo: string): Promise<{ min_amount: number }> {
    return this.request(`/min-amount?currency_from=${currencyFrom}&currency_to=${currencyTo}`)
  }

  /**
   * Get estimated price
   */
  async getEstimatedPrice(amount: number, currencyFrom: string, currencyTo: string): Promise<{ estimated_amount: number }> {
    return this.request(`/estimate?amount=${amount}&currency_from=${currencyFrom}&currency_to=${currencyTo}`)
  }

  /**
   * Create a payment
   */
  async createPayment(params: CreatePaymentParams): Promise<PaymentResponse> {
    return this.request('/payment', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    return this.request(`/payment/${paymentId}`)
  }

  /**
   * Create invoice (for more complex payment flows)
   */
  async createInvoice(params: {
    price_amount: number
    price_currency: string
    order_id?: string
    order_description?: string
    ipn_callback_url?: string
    success_url?: string
    cancel_url?: string
  }): Promise<{ id: string; invoice_url: string }> {
    return this.request('/invoice', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }
}

// Create singleton instance
let client: NOWPaymentsClient | null = null

export function getNOWPaymentsClient(): NOWPaymentsClient {
  if (!client) {
    const apiKey = process.env.NOWPAYMENTS_API_KEY
    if (!apiKey) {
      throw new Error('NOWPAYMENTS_API_KEY environment variable is not set')
    }
    client = new NOWPaymentsClient(apiKey)
  }
  return client
}

// Helper functions for common operations
export async function createUSDTPayment(
  amount: number,
  orderId: string,
  description: string,
  network: 'TRC20' | 'ERC20' | 'BEP20' = 'TRC20'
): Promise<PaymentResponse> {
  const client = getNOWPaymentsClient()
  
  // Map network to currency code
  const currencyMap = {
    'TRC20': 'usdttrc20',
    'ERC20': 'usdterc20',
    'BEP20': 'usdtbsc',
  }

  return client.createPayment({
    price_amount: amount,
    price_currency: 'usd',
    pay_currency: currencyMap[network],
    order_id: orderId,
    order_description: description,
    ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/nowpayments`,
  })
}

export async function checkPaymentStatus(paymentId: string): Promise<PaymentStatus> {
  const client = getNOWPaymentsClient()
  return client.getPaymentStatus(paymentId)
}

export { NOWPaymentsClient }
export type { PaymentResponse, PaymentStatus, CreatePaymentParams }
