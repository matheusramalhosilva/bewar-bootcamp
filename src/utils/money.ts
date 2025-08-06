export function formatPriceInCentsToBRL({ cents }: { cents: number }): string {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);

  return formattedValue
}
