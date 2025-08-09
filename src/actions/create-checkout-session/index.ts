"use server"

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";
import { z } from "zod";

import { db } from "@/db";
import {
  orderItemTable,
  orderTable
} from "@/db/schema";
import { auth } from "@/lib/auth";
import { removeKeysString } from "@/utils/remove-keys-string";

const createCheckoutSessionSchema = z.object({
  orderId: z.uuid(),
});

export type CreateCheckoutSessionSchema = z.infer<
  typeof createCheckoutSessionSchema
>;

export async function createCheckoutSession(
  data: CreateCheckoutSessionSchema,
) {
  // Verifica se existe a env
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not set");
  }

  // valida se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Pega o order id
  const { orderId } = createCheckoutSessionSchema.parse(data);

  // Pega o pedido e verifica se existe
  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId),
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // Verifica se o usuário é o dono do pedido
  if (order.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  // Pega os itens do pedido
  const orderItems = await db.query.orderItemTable.findMany({
    where: eq(orderItemTable.orderId, orderId),
    with: {
      productVariant: {
        with: {
          product: true
        }
      },
    },
  });

  // Cria a sessão de checkout no stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Cria checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment", // pagamento único
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: orderItems.map((orderItem) => {
      const orderProductImageUrl = removeKeysString({ str: orderItem.productVariant.imageUrl });

      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${orderItem.productVariant.product.name} - ${orderItem.productVariant.name}`,
            description: orderItem.productVariant.product.description,
            images: [orderProductImageUrl],
          },
          unit_amount: orderItem.priceInCents, // Em centavos
        },
        quantity: orderItem.quantity,
      };
    }),
  });

  return checkoutSession;
};
