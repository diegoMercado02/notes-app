import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function errorResponse(error: unknown, message: string, status: number = 500) {
  const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

  return new Response(
    JSON.stringify({
      success: false,
      error: {
        message,
        details: errorMessage,
      },
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
