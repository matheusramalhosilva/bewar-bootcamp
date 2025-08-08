import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";
import { cn } from "@/lib/cn";
import { removeKeysString } from "@/utils/remove-keys-string";

type VariantSelectorProps = {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

export default function VariantSelector({
  selectedVariantSlug,
  variants,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      {variants?.map((variant) => {
        const imageUrl = removeKeysString({ str: variant.imageUrl });

        return (
          <Link
            key={variant.id}
            href={`/product-variant/${variant.slug}`}
            className={cn(selectedVariantSlug === variant.slug && "border-primary rounded-xl border-2")}
          >
            <Image
              width={68}
              height={68}
              src={imageUrl}
              alt={variant.name}
              className="rounded-xl"
            />
          </Link>
        );
      })}
    </div>
  );
};
