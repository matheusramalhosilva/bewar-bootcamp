import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";

type GoToPaymentProps = {
  selectedAddress: string | null;
}

export function GoToPayment({ selectedAddress }: GoToPaymentProps) {
  const router = useRouter();
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();

  async function handleGoToPayment() {
    if (!selectedAddress || selectedAddress === "add_new") return;

    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: selectedAddress,
      });

      toast.success("Endereço selecionado para entrega!");
      router.push("/cart/confirmation");
    } catch (error) {
      toast.error("Erro ao selecionar endereço. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="mt-4">
      <Button
        onClick={handleGoToPayment}
        className="w-full"
        disabled={updateCartShippingAddressMutation.isPending}
      >
        {updateCartShippingAddressMutation.isPending
          ? "Processando..."
          : "Ir para pagamento"}
      </Button>
    </div>
  )
}
