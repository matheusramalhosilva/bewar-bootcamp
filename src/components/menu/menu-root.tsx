'use client'

import { MenuIcon } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type MenuRootProps = {
  children: ReactNode
}

export function MenuRoot({ children }: MenuRootProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle> Menu </SheetTitle>
        </SheetHeader>

        <div className="px-5">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}
