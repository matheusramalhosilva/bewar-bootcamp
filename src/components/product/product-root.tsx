import type { ReactNode } from "react"

type ProductRootProps = {
  title: string
  children?: ReactNode
}

export function ProductRoot({ title, children }: ProductRootProps) {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold text-xl"> {title} </h3>

      {children}
    </div>
  )
}
