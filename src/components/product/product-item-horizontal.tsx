import Image from "next/image";

import { formatPriceInCentsToBRL } from "@/utils/price-format";
import { removeKeysString } from "@/utils/remove-keys-string";

type ProductItemProps = {
  id: string;
  name: string;
  variantName: string;
  quantity: number;
  priceInCents: number;
  imageUrl: string;
}

export function ProductItemHorizontal({
  id,
  name,
  variantName,
  quantity,
  priceInCents,
  imageUrl
}: ProductItemProps) {
  const productImageUrl = removeKeysString({ str: imageUrl });

  return (
    <div className="flex items-center justify-between" id={id}>
      <div className="flex items-center gap-4">
        <Image
          src={productImageUrl}
          alt={name}
          width={78}
          height={78}
          className="rounded-lg"
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold"> {name} </p>

          <p className="text-muted-foreground text-xs font-medium">
            {variantName}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-2">
        <p className="text-sm font-bold">
          {formatPriceInCentsToBRL({ priceInCents: priceInCents })}
        </p>
      </div>
    </div>
  )
}
