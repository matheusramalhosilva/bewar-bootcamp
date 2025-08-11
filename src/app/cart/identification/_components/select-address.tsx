/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch, SetStateAction } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatAddress } from "@/utils/format-address";

type SelectAddressProps = {
  addresses: any;
  selectedAddress: string | null;
  setSelectedAddress: Dispatch<SetStateAction<string | null>>
}

export function SelectAddress({
  addresses,
  selectedAddress,
  setSelectedAddress
}: SelectAddressProps) {
  return (
    <RadioGroup
      value={selectedAddress}
      onValueChange={setSelectedAddress}
    >
      {addresses?.length === 0 && (
        <div className="py-4 text-center">
          <p className="text-muted-foreground">
            Você ainda não possui endereços cadastrados.
          </p>
        </div>
      )}

      {addresses?.map((address: any) => (
        <Card key={address.id}>
          <CardContent>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value={address.id} id={address.id} />

              <div className="flex-1">
                <Label htmlFor={address.id} className="cursor-pointer">
                  <div>
                    <p className="text-sm">{formatAddress(address)}</p>
                  </div>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="add_new" id="add_new" />
            <Label htmlFor="add_new">Adicionar novo endereço</Label>
          </div>
        </CardContent>
      </Card>
    </RadioGroup>
  )
}
