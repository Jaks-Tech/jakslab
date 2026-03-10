import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createHash } from "crypto"

/**
 * Standard Tailwind class merger
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a unique deterministic hash for citation caching.
 * This ensures that the same input with the same style always 
 * points to the same entry in your Supabase database.
 */
export function generateCitationHash(input: string, style: string): string {
  return createHash("sha256")
    .update(`${input.trim().toLowerCase()}-${style.toLowerCase()}`)
    .digest("hex")
}

/**
 * Formats date strings for the 'Neural Terminal' UI
 */
export function formatTerminalDate(date: Date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date)
}