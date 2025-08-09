"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

export function FinishOrderButton() {
  const finishOrderMutation = useFinishOrder();

  async function handleFinishOrder() {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe secret key is not set");
    }

    // cria o pedido
    const { orderId } = await finishOrderMutation.mutateAsync();

    // cria a sessão do stripe
    const checkoutSession = await createCheckoutSession({ orderId });

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    if (!stripe) {
      throw new Error("Failed to load Stripe");
    }

    await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
  };

  return (
    <>
      <Button
        className="w-full rounded-full cursor-pointer"
        size="lg"
        onClick={handleFinishOrder}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}

        Finalizar compra
      </Button>
    </>
  );
};
