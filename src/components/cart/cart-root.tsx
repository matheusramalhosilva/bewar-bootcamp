"use client";

import { ShoppingBasketIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type CartRootProps = {
  name: string;
  children?: ReactNode
}

export function CartRoot({ name, children }: CartRootProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle> {name} </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};
