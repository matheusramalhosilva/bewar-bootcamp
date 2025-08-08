import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/actions/get-user-addresses";
import { shippingAddressTable } from "@/db/schema";

export function getUserAddressesQueryKey() {
  return ["user-addresses"] as const;
}

export function useUserAddresses(params?: {
  initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) {
  return useQuery({
    queryKey: getUserAddressesQueryKey(),
    queryFn: getUserAddresses,
    initialData: params?.initialData,
  });
};
