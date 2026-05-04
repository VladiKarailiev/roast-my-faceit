/**
 * Pure validation helpers — safe to import from client components.
 * Keep this file free of any server-only imports (no fs, no env reads).
 */

/** FACEIT nicknames are 3–20 chars: letters, digits, and _-.| */
export function isValidNickname(input: string): boolean {
  return /^[A-Za-z0-9_.\-|]{3,20}$/.test(input);
}
