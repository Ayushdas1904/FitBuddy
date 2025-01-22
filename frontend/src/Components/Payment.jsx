import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_STRIPE_KEY');

const Payment = async () => {
  const stripe = await stripePromise;

  // Call your backend to create the checkout session
  const response = await fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartItems,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
    });

  const session = await response.json();

  // Redirect to Stripe Checkout
  const { error } = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (error) {
    console.error('Stripe Checkout Error:', error);
  }
};


export default Payment;