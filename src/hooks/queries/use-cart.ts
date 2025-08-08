import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-cart";

export function getUseCartQueryKey() {
  return ["cart"] as const;
}

export function useCart(params?: {
  initialData?: Awaited<ReturnType<typeof getCart>>;
}) {
  return useQuery({
    queryKey: getUseCartQueryKey(),
    queryFn: () => getCart(),
    initialData: params?.initialData,
  });
}
