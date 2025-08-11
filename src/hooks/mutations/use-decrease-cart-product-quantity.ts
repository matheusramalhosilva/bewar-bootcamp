import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";

import { getUseCartQueryKey } from "../queries/use-cart";

export function getUseDecreaseCartProductQuantityMutationKey(cartItemId: string) {
  return [
    'decrease-cart-product-quantity',
    cartItemId
  ] as const;
}

export function useDecreaseCartProductQuantity(cartItemId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseDecreaseCartProductQuantityMutationKey(cartItemId),
    mutationFn: () => {
      return decreaseCartProductQuantity({ cartItemId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
}
