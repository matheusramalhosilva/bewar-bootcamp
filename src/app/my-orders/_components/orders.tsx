import { OrderSummary } from "@/components/order-summary";
import { ProductItemHorizontal } from "@/components/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { orderTable } from "@/db/schema";

type OrdersProps = {
  orders: {
    id: string;
    status: (typeof orderTable.$inferSelect)["status"];
    totalPriceInCents: number;
    createdAt: Date;
    items: {
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }[]
  }[]
}

export function Orders({ orders }: OrdersProps) {
  function getOrderStatusDisplay(status: string) {
    switch (status) {
      case "paid":
        return {
          label: "Pago",
          variant: "default" as const,
        };
      case "pending":
        return {
          label: "Pendente",
          variant: "outline" as const,
        };
      case "canceled":
        return {
          label: "Cancelado",
          variant: "destructive" as const,
        };
      default:
        return {
          label: status,
          variant: "secondary" as const,
        };
    }
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => {
        const statusDisplay = getOrderStatusDisplay(order.status);

        return (
          <Card key={order.id}>
            <CardContent>
              <Accordion type="single" collapsible key={order.id}>
                <AccordionItem value={order.id}>
                  <AccordionTrigger className="hover:no-underline hover:cursor-pointer">
                    <div className="flex items-center justify-between gap-2">
                      <p>
                        Pedido feito em:{" "}
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                        {" "}às{" "}
                        {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>

                      <Badge variant={statusDisplay.variant}>
                        {statusDisplay.label}
                      </Badge>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    {order.items.map((product) => (
                      <ProductItemHorizontal
                        key={product.id}
                        id={product.id}
                        name={product.productName}
                        variantName={product.productVariantName}
                        quantity={product.quantity}
                        priceInCents={product.priceInCents}
                        imageUrl={product.imageUrl}
                      />
                    ))}

                    <Separator className="my-4" />

                    <OrderSummary
                      subtotalInCents={order.totalPriceInCents}
                      totalInCents={order.totalPriceInCents}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
