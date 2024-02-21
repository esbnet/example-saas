import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
}: {
  priceId: string;
  domainUrl: string;
  customerId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    customer: customerId,
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/canceled`,
  });

  return session.url as string;
};
