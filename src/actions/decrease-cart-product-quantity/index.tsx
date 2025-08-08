"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

const decreaseCartProductQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

type DecreaseCartProductQuantitySchema = z.infer<
  typeof decreaseCartProductQuantitySchema
>;

export async function decreaseCartProductQuantity(
  data: DecreaseCartProductQuantitySchema,
) {
  // valida os dados
  decreaseCartProductQuantitySchema.parse(data);

  // valida se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Pega o item do carrinho pelo id
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  });

  // Verifica se existe carrinho
  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  // Verifica se o id do produto pertence a um carrinho e pertence ao usuario
  const cartDoesNotBelongToUser = cartItem.cart.userId !== session.user.id;

  if (cartDoesNotBelongToUser) {
    throw new Error("Unauthorized");
  }

  // Se a quantidade for 1 remove o produto
  if (cartItem.quantity === 1) {
    await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
    return;
  }

  // Diminui a quantidade se tiver mais do que uma
  await db
    .update(cartItemTable)
    .set({ quantity: cartItem.quantity - 1 })
    .where(eq(cartItemTable.id, cartItem.id));
};
