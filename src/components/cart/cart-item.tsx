import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { useDecreaseCartProductQuantity } from "@/hooks/mutations/use-decrease-cart-product-quantity";
import { useIncreaseCartProductQuantity } from "@/hooks/mutations/use-increase-cart-product-quantity";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";
import { formatPriceInCentsToBRL } from "@/utils/price-format";
import { removeKeysString } from "@/utils/remove-keys-string";
import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export function CartItem({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const decreaseCartProductQuantityMutation = useDecreaseCartProductQuantity(id);
  const increaseCartProductQuantityMutation = useIncreaseCartProductQuantity(productVariantId);

  const productImageUrl = removeKeysString({ str: productVariantImageUrl });

  function handleRemoveProductFromCart() {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Produto removido do carrinho com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao remover produto do carrinho.');
      }
    });
  }

  function handleDecreaseProductQuantity() {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Quantidade do produto diminuída com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao diminuir quantidade do produto no carrinho.');
      }
    });
  }

  function handleIncreaseProductQuantity() {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Quantidade do produto aumentada com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao aumentar quantidade do produto no carrinho.');
      }
    });
  }

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
              onClick={handleIncreaseProductQuantity}
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
