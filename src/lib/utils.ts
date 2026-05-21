import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind CSS inteligentemente, resolviendo conflictos.
 * Ideal para construir componentes reutilizables.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
