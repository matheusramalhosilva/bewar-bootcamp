import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { getUseCartQueryKey } from "../queries/use-cart";

export function getUseDecreaseCartProductQuantityMutation(cartItemId: string) {
  return [
    'decrease-cart-product-quantity',
    cartItemId
  ] as const;
}

export function useDecreaseCartProductQuantityMutation(cartItemId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseDecreaseCartProductQuantityMutation(cartItemId),
    mutationFn: () => {
      return decreaseCartProductQuantity({ cartItemId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
}
