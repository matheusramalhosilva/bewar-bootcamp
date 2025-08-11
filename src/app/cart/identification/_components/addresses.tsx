"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shippingAddressTable } from "@/db/schema";
import { useUserAddresses } from "@/hooks/queries/use-user-addresses";

import { AddressForm } from "./address-form";
import { GoToPayment } from "./go-to-payment";
import { SelectAddress } from "./select-address";

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId: string | null;
}

export function Addresses({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null,
  );

  const { data: addresses, isLoading } = useUserAddresses({
    initialData: shippingAddresses,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="py-4 text-center">
            <p> Carregando endereços... </p>
          </div>
        ) : (
          <SelectAddress
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )}

        {selectedAddress && selectedAddress !== "add_new" && (
          <GoToPayment selectedAddress={selectedAddress} />
        )}

        {selectedAddress === "add_new" && (
          <AddressForm setSelectedAddress={setSelectedAddress} />
        )}
      </CardContent>
    </Card>
  );
};
