"use server"

import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

const addProductToCartSchema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().min(1),
});

export type AddProductToCartSchema = z.infer<typeof addProductToCartSchema>;

export async function addProductToCart(data: AddProductToCartSchema) {
  // valida os dados
  addProductToCartSchema.parse(data);

  // valida se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // verificar se o produto existe
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) => eq(productVariant.id, data.productVariantId),
  })

  if (!productVariant) {
    throw new Error("Product not found");
  }

  // Pega o carrinho do usuário
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  let cartId = cart?.id;

  // Se não existir carrinho, cria um novo
  if (!cartId) {
    const [newCart] = await db.insert(cartTable).values({
      userId: session.user.id,
    }).returning();

    cartId = newCart.id
  }

  // verificar se a item ja existe no carrinho
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) =>
      eq(cartItem.cartId, cartId) &&
      eq(cartItem.productVariantId, data.productVariantId),
  });

  // Se existe atualzia a quantidade
  if (cartItem) {
    await db.update(cartItemTable).set({
      quantity: cartItem.quantity + data.quantity,
    }).where(eq(cartItemTable.id, cartItem.id));

    return;
  }

  // Se o item não existe, adiciona
  await db.insert(cartItemTable).values({
    cartId,
    productVariantId: data.productVariantId,
    quantity: data.quantity,
  });
}
