/**
 * Formata um objeto de endereço em uma string amigável para exibição
 * @param address - Objeto contendo os dados do endereço
 * @returns Endereço formatado como string
 */
export function formatAddress(address: {
  recipientName: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}) {
  const addressFormatted = `${address.recipientName} • ${address.street}, ${address.number}
    ${address.complement && `, ${address.complement}`}, ${address.neighborhood}
    , ${address.city} - ${address.state} • CEP: ${address.zipCode}`;

  return addressFormatted;
};
