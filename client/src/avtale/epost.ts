/**
 * https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
 */
export function validerEpost(epost: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost)
}
