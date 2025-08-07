
import type { ComponentProps } from "react";

type CategoryRootProps = ComponentProps<'div'>

export function CategoryRoot({ ...rest }: CategoryRootProps) {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6">
      <div className="grid grid-cols-2 gap-3" {...rest} />
    </div>
  )
}
