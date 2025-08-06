'use client'

import type { productTable, productVariantTable } from "@/db/schema"
import ProductItem from "./product-item"

type ProductListProps = {
  title: string
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[]
  })[]
}

export default function ProductList({ title, products }: ProductListProps) {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold"> {title} </h3>

      <div
        className="w-full px-5 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }} // Para firefox
      >
        {products.length > 0 && products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
