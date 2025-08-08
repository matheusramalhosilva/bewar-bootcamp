import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createShippingAddress } from "@/actions/create-shipping-address";

import { getUserAddressesQueryKey } from "../queries/use-user-addresses";

export function getCreateShippingAddressMutationKey() {
  return ["create-shipping-address"] as const;
}

export function useCreateShippingAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getCreateShippingAddressMutationKey(),
    mutationFn: createShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserAddressesQueryKey(),
      });
    },
  });
};
