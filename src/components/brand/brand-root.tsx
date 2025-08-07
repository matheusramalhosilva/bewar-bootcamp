import type { ComponentProps } from "react"

type BrandRootProps = ComponentProps<'div'>

export function BrandRoot({ ...rest }: BrandRootProps) {
  return (
    <div className="space-y-6" {...rest} />
  )
}
