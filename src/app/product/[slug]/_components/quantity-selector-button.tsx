"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type QuantityButtonProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function QuantityButton({
  quantity,
  onIncrement,
  onDecrement
}: QuantityButtonProps) {
  return (
    <div className="px-5">
      <div className="space-y-4">
        <h3 className="font-medium"> Quantidade </h3>

        <div className="flex w-[100px] items-center justify-between rounded-lg border">
          <Button size="icon" variant="ghost" onClick={onDecrement}>
            <MinusIcon />
          </Button>

          <p> {quantity} </p>

          <Button size="icon" variant="ghost" onClick={onIncrement}>
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
