import Stripe from "stripe";

import { cookies } from "next/headers";
import { getServerSideUser } from "../lib/payload-utils";
import { getPayloadClient } from "../get-payload";

function handleValidUpgradeMonthly(category: string) {
  if (category === "venues") {
    return "price_1OdzDHJFw5rSN4LFiA948CVR";
  } else if (category === "agents") {
    return "price_1OdzDHJFw5rSN4LFiA948CVR";
  } else if (category === "bridals") {
    return "price_1OdzD2JFw5rSN4LF1CQjpORa";
  } else if (category === "photovideo") {
    return "price_1OdzD2JFw5rSN4LF1CQjpORa";
  } else if (category === "catering") {
    return "price_1OdzD2JFw5rSN4LF1CQjpORa";
  } else if (category === "decor") {
    return "price_1OdzD2JFw5rSN4LF1CQjpORa";
  } else if (category === "henna") {
    return "price_1OdzD2JFw5rSN4LF1CQjpORa";
  } else if (category === "mua") {
    return "price_1OdzD2JFw5rSN4LF1CQjpORa";
  } else if (category === "emcees") {
    return "price_1OdzD2JFw5rSN4LF1CQjpORa";
  } else if (category === "honeymoon") {
    return "price_1OdzD2JFw5rSN4LF1CQjpORa";
  } else if (category === "misc") {
    return "price_1OdzD2JFw5rSN4LF1CQjpORa";
  } else {
    return "price_1OdzD2JFw5rSN4LF1CQjpORa";
  }
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export async function hasSubscription() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  const payload = await getPayloadClient();

  if (user) {
    const subscriptions = await stripe.subscriptions.list({
      customer: String(user?.stripe_customer_id),
    });

    if (subscriptions.data.length > 0 && user.role === "vendor") {
      await payload.update({
        collection: "users",
        data: {
          role: "supervendor",
        },
        where: {
          id: {
            equals: user.id,
          },
        },
      });
    }

    if (subscriptions.data.length === 0) {
      await payload.update({
        collection: "users",
        data: {
          role: "vendor",
        },
        where: {
          id: {
            equals: user.id,
          },
        },
      });
    }

    return subscriptions.data.length > 0;
  }

  return false;
}

export async function createCheckoutLink(userId: string) {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const payload = await getPayloadClient();

  //Find user category
  const vendor = await payload.find({
    collection: "vendors",
    where: {
      venduserid: { equals: userId },
    },
  });

  //checkout url
  if (user?.stripe_customer_id) {
    const checkout = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/status`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/status`,
      payment_method_types: ["card"],
      customer: user.stripe_customer_id,
      line_items: [
        {
          price: handleValidUpgradeMonthly(vendor.docs[0].category),
          quantity: 1,
        },
      ],
      mode: "subscription",
    });

    return checkout.url;
  }
}

export async function generateCustomerPortalLink(customerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/status`,
    });

    console.log();

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function createCustomerIfNull() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const payload = await getPayloadClient();

  if (!user?.stripe_customer_id) {
    const customer = await stripe.customers.create({
      email: user?.email,
    });

    await payload.update({
      collection: "users",
      where: {
        id: { equals: user?.id },
      },
      data: {
        stripe_customer_id: customer.id,
      },
    });

    const validUser = await payload.find({
      collection: "users",
      where: {
        email: { equals: user?.email },
      },
    });

    return validUser?.docs[0].stripe_customer_id;
  }
}
