import type { ComponentProps } from "react"

type MenuContentProps = ComponentProps<'div'>

export function MenuContent({ ...rest }: MenuContentProps) {
  return (
    <div className="flex justify-between space-y-6" {...rest} />
  )
}
