const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_0123456789";
const ID_LENGTH = 10;

/**
 * Generates a friendly ID.
 * @returns A friendly ID.
 */
export default function friendlyId(): string {
  return Array.from({ length: ID_LENGTH }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("");
}
