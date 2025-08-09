import { formatPriceInCentsToBRL } from "@/utils/price-format";

type OrderSummaryProps = {
  subtotalInCents: number;
  totalInCents: number;
}

export function OrderSummary({
  subtotalInCents,
  totalInCents
}: OrderSummaryProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <p className="text-sm"> Subtotal </p>

        <p className="text-muted-foreground text-sm font-medium">
          {formatPriceInCentsToBRL({ priceInCents: subtotalInCents })}
        </p>
      </div>

      <div className="flex justify-between">
        <p className="text-sm"> Frete </p>
        <p className="text-muted-foreground text-sm font-medium"> GRÁTIS </p>
      </div>

      <div className="flex justify-between">
        <p className="text-sm"> Total </p>

        <p className="text-base font-semibold">
          {formatPriceInCentsToBRL({ priceInCents: totalInCents })}
        </p>
      </div>
    </div>
  )
}
