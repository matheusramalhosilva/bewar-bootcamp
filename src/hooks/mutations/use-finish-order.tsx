import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getUseCartQueryKey } from "../queries/use-cart";

export function getUseFinishOrderMutationKey() {
  return [
    'finish-order'
  ] as const;
}

export function useFinishOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseFinishOrderMutationKey(),
    mutationFn: async () => {
      await finishOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
