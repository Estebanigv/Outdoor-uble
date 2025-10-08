/**
 * Generates a WhatsApp link with pre-filled message
 */
export function getWhatsAppLink(phone: string, message?: string): string {
  // Remove all non-numeric characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, "");

  // Ensure it starts with + for international format
  const formattedPhone = cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`;

  // URL encode the message if provided
  const encodedMessage = message ? encodeURIComponent(message) : "";

  // Return WhatsApp API link
  return `https://wa.me/${formattedPhone.slice(1)}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
}

/**
 * Gets default WhatsApp message for rafting inquiry
 */
export function getDefaultRaftingMessage(): string {
  return "Quiero vivir una experiencia única!";
}
