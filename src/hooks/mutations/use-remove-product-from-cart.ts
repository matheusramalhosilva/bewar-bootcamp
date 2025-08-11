import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeProductFromCart } from "@/actions/remove-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

export function getUseRemoveProductFromCartMutationKey(cartItemId: string) {
  return [
    'remove-cart-product',
    cartItemId
  ] as const;
}

export function useRemoveProductFromCart(cartItemId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseRemoveProductFromCartMutationKey(cartItemId),
    mutationFn: () => {
      return removeProductFromCart({ cartItemId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
}
