import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

export function getUseIncreaseCartProductQuantityMutationKey(productVariantId: string) {
  return [
    'increase-cart-product-quantity',
    productVariantId
  ] as const;
}

export function useIncreaseCartProductQuantity(productVariantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseIncreaseCartProductQuantityMutationKey(productVariantId),
    mutationFn: () => {
      return addProductToCart({ productVariantId, quantity: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
}
