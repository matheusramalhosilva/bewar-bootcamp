import type { ComponentProps } from "react"

type BrandTitleProps = ComponentProps<'h3'>

export function BrandTitle({ ...rest }: BrandTitleProps) {
  return (
    <h3 className="px-5 font-semibold text-xl" {...rest} />
  )
}
