"use client";

import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

type CartCompletePurchaseProps = ComponentProps<"button">

export function CartCompletePurchase({ ...rest }: CartCompletePurchaseProps) {
  return (
    <Button className="mt-5 rounded-full" {...rest}>
      Finalizar compra
    </Button>
  );
};
