'use client'

import type { productTable, productVariantTable } from "@/db/schema"
import { formatPriceInCentsToBRL } from "@/utils/money"
import Image from "next/image"
import Link from "next/link"

type ProductItemProps = {
  product: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[]
  })
}

export default function ProductItem({ product }: ProductItemProps) {
  const firstProductVariant = product.variants[0]
  console.log(firstProductVariant)

  return (
    <Link className="flex flex-col gap-4" href="">
      <Image
        src={firstProductVariant.imageUrl}
        alt={firstProductVariant.name}
        width={208}
        height={208}
        className="rounded-3xl"
      />

      <div className="flex flex-col gap-1 max-w-52">
        <p className="truncate text-sm font-medium"> {product.name} </p>

        <p className="truncate text-xs font-medium text-muted-foreground">
          {product.description}
        </p>

        <p className="truncate text-sm font-semibold">
          {formatPriceInCentsToBRL({ cents: firstProductVariant.priceInCents })}
        </p>
      </div>
    </Link>
  )
}
