import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortColorsTag() {
  const colors = [
    "bg-teal-500 hover:bg-teal-600",
    "bg-indigo-500 hover:bg-indigo-600",
    "bg-pink-900 hover:bg-pink-800",
    "bg-stone-500 hover:bg-stone-600",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function truncateText(text: string, maxLength: number) {
  if (!text) return;
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + "...";
}

export function formatDateToBrazilian(dateString: string) {
  if (!dateString) return;
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}
