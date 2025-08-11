"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPriceInCentsToBRL } from "@/utils/price-format";

type CartFooterProps = {
  totalPriceInCents: number
}

export function CartFooter({ totalPriceInCents }: CartFooterProps) {
  return (
    <div className="flex flex-col gap-4">
      <Separator />

      <div className="flex items-center justify-between text-xs font-medium">
        <p> Subtotal </p>
        <p>
          {formatPriceInCentsToBRL({ priceInCents: totalPriceInCents ?? 0 })}
        </p>
      </div>

      <Separator />

      <div className="flex items-center justify-between text-xs font-medium">
        <p> Entrega </p>
        <p> GRÁTIS </p>
      </div>

      <Separator />

      <div className="flex items-center justify-between text-xs font-medium">
        <p>Total</p>
        <p>
          {formatPriceInCentsToBRL({ priceInCents: totalPriceInCents ?? 0 })}
        </p>
      </div>

      <Button asChild className="mt-5 rounded-full cursor-pointer">
        <Link href="/cart/identification"> Finalizar compra </Link>
      </Button>
    </div>
  );
};
