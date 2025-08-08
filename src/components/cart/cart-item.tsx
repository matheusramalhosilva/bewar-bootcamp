import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatPriceInCentsToBRL } from "@/utils/price-format";
import { removeKeysString } from "@/utils/remove-keys-string";
import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export function CartItem({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) {
  const productImageUrl = removeKeysString({ str: productVariantImageUrl });

  return (
    <div className="flex items-center justify-between" id={id}>
      <div className="flex items-center gap-4">
        <Image
          src={productImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold"> {productName} </p>

          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>

          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button className="h-4 w-4" variant="ghost" onClick={() => { }}>
              <MinusIcon />
            </Button>

            <p className="text-xs font-medium"> {quantity} </p>

            <Button className="h-4 w-4" variant="ghost" onClick={() => { }}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon">
          <TrashIcon />
        </Button>

        <p className="text-sm font-bold">
          {formatPriceInCentsToBRL({ priceInCents: productVariantPriceInCents })}
        </p>
      </div>
    </div>
  );
};
