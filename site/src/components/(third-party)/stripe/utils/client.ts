// src/utils/stripe/client.ts
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
      ''
    );
  }

  return stripePromise;
};
