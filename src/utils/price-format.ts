/**
 * Formata um preço em centavos para o formato de moeda brasileira (BRL)
 * @param priceInCents - O preço em centavos a ser formatado
 * @returns O preço formatado como string no padrão brasileiro (ex: "R$ 10,50")
 */
export function formatPriceInCentsToBRL({ priceInCents }: { priceInCents: number }): string {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceInCents / 100);

  return formattedValue
}
