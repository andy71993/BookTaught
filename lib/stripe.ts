import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export async function createCheckoutSession(
  userId: string,
  email: string
): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'BookTaught Founding Member',
            description:
              'Lifetime access to all books and chapters. Support the platform at the founding member price.',
          },
          unit_amount: 4900, // $49.00
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/canceled`,
    metadata: {
      userId,
    },
  });

  return session.url!;
}

export async function upgradeToPaidMember(
  userId: string,
  stripeCustomerId: string
): Promise<void> {
  // This will be implemented in the Supabase client side
  // For now, we just store the stripe customer ID
}
