// src/hooks/usePricingLogic.ts
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getStripe } from '@/components/(third-party)/stripe/utils/client';
import { checkoutWithStripe } from '@/components/(third-party)/stripe/utils/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import { Tables } from 'types_db'; // Adjust the import path as necessary

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

export function usePricingLogic(user: User | null | undefined) {
  const [billingInterval, setBillingInterval] = useState<'lifetime' | 'year' | 'month'>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const router = useRouter();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(price, currentPath);

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  return { billingInterval, setBillingInterval, handleStripeCheckout, priceIdLoading };
}
