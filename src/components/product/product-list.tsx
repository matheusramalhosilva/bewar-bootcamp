import type { ReactNode } from "react"

type ProductListProps = {
  children?: ReactNode
}

export function ProductList({ children }: ProductListProps) {
  return (
    <div
      className="w-full px-5 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none" }} // Para firefox
    >
      {children}
    </div>
  )
}
