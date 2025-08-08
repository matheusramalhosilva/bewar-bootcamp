import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-cart";

export function getUseCartQueryKey() {
  return ["cart"] as const;
}

export function useCart() {
  return useQuery({
    queryKey: getUseCartQueryKey(),
    queryFn: () => getCart(),
  });
}
