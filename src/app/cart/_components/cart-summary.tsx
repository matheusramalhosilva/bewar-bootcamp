import { OrderSummary } from "@/components/order-summary";
import { ProductItemHorizontal } from "@/components/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
        <OrderSummary
          subtotalInCents={subtotalInCents}
          totalInCents={totalInCents}
        />

        <Separator className="my-3" />

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
