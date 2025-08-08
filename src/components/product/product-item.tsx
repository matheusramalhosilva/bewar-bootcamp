'use client'

import Image from "next/image"
import Link from "next/link"

import type { productTable, productVariantTable } from "@/db/schema"
import { cn } from "@/lib/utils"
import { formatPriceInCentsToBRL } from "@/utils/price-format"
import { removeKeysString } from "@/utils/remove-keys-string"

type ProductItemProps = {
  product: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[]
  })
  textContainerClassName?: string
}

export function ProductItem({ product, textContainerClassName }: ProductItemProps) {
  const firstProductVariant = product.variants[0]
  const productImageUrl = removeKeysString({ str: firstProductVariant.imageUrl });

  return (
    <Link className="flex flex-col gap-4" href={`/product/${firstProductVariant.slug}`}>
      <Image
        src={productImageUrl}
        alt={firstProductVariant.name}
        sizes="100vw"
        width={0}
        height={0}
        className="w-full h-auto rounded-3xl"
      />

      <div className={cn('flex flex-col gap-1 max-w-52', textContainerClassName)}>
        <p className="truncate text-sm font-medium"> {product.name} </p>

        <p className="truncate text-xs font-medium text-muted-foreground">
          {product.description}
        </p>

        <p className="truncate text-sm font-semibold">
          {formatPriceInCentsToBRL({ priceInCents: firstProductVariant.priceInCents })}
        </p>
      </div>
    </Link>
  )
}
