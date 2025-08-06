'use client'

import BrandItem from "./brand-item"

type BrandListProps = {
  title: string
  brands: {
    name: string;
    image: string;
  }[]
}

export default function BrandList({ title, brands }: BrandListProps) {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold text-xl"> {title} </h3>

      <div
        className="w-full px-5 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }} // Para firefox
      >
        {brands.length > 0 && brands.map((brand, index) => (
          <BrandItem key={brand.name + index} brand={brand} />
        ))}
      </div>
    </div>
  )
}
