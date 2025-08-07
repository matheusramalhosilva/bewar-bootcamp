/**
 * Remove chaves e aspas do início e fim de uma string
 * @param str - A string a ser processada
 * @returns A string limpa, sem chaves e aspas nas extremidades
 */
export function removeKeysString({ str }: { str: string }): string {
  const strFormatted = str.replace(/^[{\"]+|[\"}]+$/g, "");
  return strFormatted;
}
