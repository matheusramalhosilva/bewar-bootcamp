import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { formatPriceInCentsToBRL } from "@/utils/price-format";
import { removeKeysString } from "@/utils/remove-keys-string";
import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export function CartItem({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) {
  const queryClient = useQueryClient();

  const { mutate: removeProductFromCartMutation } = useMutation({
    mutationKey: ['remove-cart-product'],
    mutationFn: (itemId: string) => {
      return removeProductFromCart({ cartItemId: itemId });
    },
    onSuccess: () => {
      toast.success('Produto removido do carrinho com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('Erro ao remover produto do carrinho.');
    }
  });

  function handleRemoveProductFromCart() {
    removeProductFromCartMutation(id);
  }

  const { mutate: decreaseCartProductQuantityMutation } = useMutation({
    mutationKey: ['decrease-cart-product-quantity'],
    mutationFn: (itemId: string) => {
      return decreaseCartProductQuantity({ cartItemId: itemId });
    },
    onSuccess: () => {
      toast.success('Quantidade do produto diminuída com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('Erro ao diminuir quantidade do produto no carrinho.');
    }
  });

  function handleDecreaseProductQuantity() {
    decreaseCartProductQuantityMutation(id);
  }

  const productImageUrl = removeKeysString({ str: productVariantImageUrl });

  return (
    <div className="flex items-center justify-between" id={id}>
      <div className="flex items-center gap-4">
        <Image
          src={productImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold"> {productName} </p>

          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>

          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button
              variant="ghost"
              className="size-4 cursor-pointer"
              onClick={handleDecreaseProductQuantity}
            >
              <MinusIcon />
            </Button>

            <p className="text-xs font-medium"> {quantity} </p>

            <Button
              variant="ghost"
              className="size-4 cursor-pointer"
              onClick={() => { }}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-2">
        <Button
          className="cursor-pointer"
          variant="outline"
          size="icon"
          onClick={handleRemoveProductFromCart}
        >
          <TrashIcon />
        </Button>

        <p className="text-sm font-bold">
          {formatPriceInCentsToBRL({ priceInCents: productVariantPriceInCents })}
        </p>
      </div>
    </div>
  );
};
