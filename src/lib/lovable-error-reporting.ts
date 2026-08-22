/**
 * Placeholder for error reporting - Lovable branding removed
 * This is kept for compatibility but does nothing
 */
export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  // Error reporting disabled
  if (typeof window !== "undefined") {
    console.error("Error:", error, context);
  }
}

