/**
 * Formats a Chilean phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Format Chilean number: +56 9 1234 5678
  if (cleaned.startsWith("+56")) {
    const number = cleaned.slice(3);
    if (number.length === 9) {
      return `+56 ${number.slice(0, 1)} ${number.slice(1, 5)} ${number.slice(5)}`;
    }
  }

  return phone;
}

/**
 * Formats a date string to Chilean format
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats currency to Chilean Pesos
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(amount);
}
