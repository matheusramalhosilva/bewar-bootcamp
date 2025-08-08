'use server'

import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

const removeProductFromCartSchema = z.object({
  cartItemId: z.uuid(),
});

export type RemoveProductFromCartSchema = z.infer<typeof removeProductFromCartSchema>;

export async function removeProductFromCart(data: RemoveProductFromCartSchema) {
  // valida os dados
  removeProductFromCartSchema.parse(data);

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
    }
  });

  // Verifica se o id do produto pertence a um carrinho e pertence ao usuario
  const cartDoesNotBelongToUser = cartItem?.cart.userId !== session.user.id

  if (cartDoesNotBelongToUser) {
    throw new Error("Unauthorized");
  }

  // Verifica se existe carrinho
  if (!cartItem) {
    throw new Error("Product not found in cart");
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
}
