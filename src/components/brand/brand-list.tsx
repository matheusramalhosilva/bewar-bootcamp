import type { ComponentProps } from "react"

type BrandListProps = ComponentProps<'div'>

export function BrandList({ ...rest }: BrandListProps) {
  return (
    <div
      className="w-full px-5 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none" }} // Para firefox
      {...rest}
    />
  )
}
