"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Use PHP handler instead of Next.js API route
      const response = await fetch("/send-email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Error al enviar el formulario");
      }

      setSubmitStatus("success");
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nombre completo *
          </label>
          <Input id="name" {...register("name")} placeholder="Tu nombre" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email *
          </label>
          <Input id="email" type="email" {...register("email")} placeholder="tu@email.com" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Teléfono *
          </label>
          <Input id="phone" type="tel" {...register("phone")} placeholder="+56 9 1234 5678" />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        {/* Participants */}
        <div className="space-y-2">
          <label htmlFor="participants" className="text-sm font-medium">
            Número de participantes
          </label>
          <Input id="participants" {...register("participants")} placeholder="Ej: 4 personas" />
          {errors.participants && <p className="text-sm text-red-600">{errors.participants.message}</p>}
        </div>

        {/* Preferred Date */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="preferredDate" className="text-sm font-medium">
            Fecha preferida
          </label>
          <Input id="preferredDate" type="date" {...register("preferredDate")} />
          {errors.preferredDate && <p className="text-sm text-red-600">{errors.preferredDate.message}</p>}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Mensaje *
        </label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Cuéntanos sobre tu interés en el tour..."
          rows={5}
        />
        {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="space-y-4">
        <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar Mensaje"
          )}
        </Button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <CheckCircle2 className="h-5 w-5" />
            <p className="text-sm">¡Mensaje enviado con éxito! Te contactaremos pronto.</p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">Error al enviar el mensaje. Por favor intenta nuevamente.</p>
          </div>
        )}
      </div>
    </form>
  );
}
