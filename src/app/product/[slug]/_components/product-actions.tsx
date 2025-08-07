"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";
import QuantityButton from "./quantity-selector-button";

type ProductActionsProps = {
  productVariantId: string;
}

export default function ProductActions({
  productVariantId
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  function handleDecrement() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  function handleIncrement() {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <QuantityButton
        quantity={quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />

      <div className="flex flex-col space-y-4 px-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />

        <Button className="rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>
    </>
  );
};
