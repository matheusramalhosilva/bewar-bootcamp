"use client";

import { useQuery } from "@tanstack/react-query";

import getCart from "@/actions/get-cart";
import {
  CartCompletePurchase,
  CartFooter,
  CartItem,
  CartListItems,
  CartRoot
} from "./index";

export function Cart() {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return (
    <CartRoot name="Carrinho">
      <CartListItems>
        {cart?.items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            productVariantId={item.productVariant.id}
            productName={item.productVariant.product.name}
            productVariantName={item.productVariant.name}
            productVariantImageUrl={item.productVariant.imageUrl}
            productVariantPriceInCents={
              item.productVariant.priceInCents
            }
            quantity={item.quantity}
          />
        ))}
      </CartListItems>

      {cart?.items && cart?.items.length > 0 && (
        <CartFooter totalPriceInCents={cart.totalPriceInCents}>
          <CartCompletePurchase />
        </CartFooter>
      )}
    </CartRoot>
  );
};
