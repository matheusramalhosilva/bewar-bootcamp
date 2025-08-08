import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateCartShippingAddress,
  type UpdateCartShippingAddressSchema
} from "@/actions/update-cart-shipping-address";

import { getUseCartQueryKey } from "../queries/use-cart";

export function getUpdateCartShippingAddressMutationKey() {
  return ["update-cart-shipping-address"] as const;
}

export function useUpdateCartShippingAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUpdateCartShippingAddressMutationKey(),
    mutationFn: (data: UpdateCartShippingAddressSchema) =>
      updateCartShippingAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
  });
};
