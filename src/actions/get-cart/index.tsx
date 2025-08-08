'use server'

import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function getCart() {
  // valida se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Pega o carrinho do usuário
  // Inclui os itens do carrinho e os detalhes do produto
  // Inclui o produto relacionado a cada variante do produto
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  // Se não existir carrinho, cria um novo
  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();

    // Retorna o novo carrinho vazio
    return {
      ...newCart,
      items: [],
      totalPriceInCents: 0,
    };
  }

  // Retorna o corrinho com os itens e o total
  return {
    ...cart,
    totalPriceInCents: cart.items.reduce(
      (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
      0,
    ),
  };
};
