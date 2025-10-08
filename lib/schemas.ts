import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .min(9, "Teléfono inválido")
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, "Formato de teléfono inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  participants: z.string().optional(),
  preferredDate: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
