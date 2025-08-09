import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Header } from "@/components/header";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { removeKeysString } from "@/utils/remove-keys-string";

import { Orders } from "./_components/orders";

export default async function MyOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user.id) {
    redirect("/authentication");
  }

  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true
            }
          }
        }
      }
    }
  })

  return (
    <div>
      <Header />

      <div className="px-5">
        <Orders
          orders={orders.map((order) => ({
            id: order.id,
            status: order.status,
            totalPriceInCents: order.totalPriceInCents,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
              id: item.id,
              imageUrl: removeKeysString({ str: item.productVariant.imageUrl }),
              productName: item.productVariant.product.name,
              productVariantName: item.productVariant.name,
              priceInCents: item.productVariant.priceInCents,
              quantity: item.quantity,
            })),
          }))}
        />
      </div>
    </div>
  );
}
