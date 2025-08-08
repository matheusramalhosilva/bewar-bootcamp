import type { ReactNode } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

type CartListItemsProps = {
  children?: ReactNode
}

export function CartListItems({ children }: CartListItemsProps) {
  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden">
      <ScrollArea className="h-full">
        <div className="flex h-full flex-col gap-8">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
};
