import { ProductItemHorizontal } from "@/components/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPriceInCentsToBRL } from "@/utils/price-format";

type ProductItem = {
  id: string;
  name: string;
  variantName: string;
  quantity: number;
  priceInCents: number;
  imageUrl: string;
}

type CartSummaryProps = {
  subtotalInCents: number;
  totalInCents: number;
  products: ProductItem[];
}

export function CartSummary({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle> Resumo </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
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

          <p className="text-muted-foreground text-sm font-medium">
            {formatPriceInCentsToBRL({ priceInCents: totalInCents })}
          </p>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        {products.map((product) => (
          <ProductItemHorizontal
            key={product.id}
            id={product.id}
            name={product.name}
            variantName={product.variantName}
            quantity={product.quantity}
            priceInCents={product.priceInCents}
            imageUrl={product.imageUrl}
          />
        ))}
      </CardContent>
    </Card>
  );
};
