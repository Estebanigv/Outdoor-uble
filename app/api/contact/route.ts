import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/schemas";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactFormSchema.parse(body);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.MAIL_FROM || "Outdoor Ñuble <onboarding@resend.dev>",
      to: process.env.MAIL_TO || "contacto@outdoornuble.cl",
      subject: `Nueva consulta de ${validatedData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
              <h1 style="color: #0f172a; margin-top: 0; margin-bottom: 10px;">Nueva Consulta - Rafting Río Ñuble</h1>
              <p style="color: #64748b; margin-top: 0;">Has recibido un nuevo mensaje de contacto</p>
            </div>

            <div style="background-color: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 30px;">
              <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 20px; font-size: 18px;">Información del Cliente</h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569;">Nombre:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    ${validatedData.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569;">Email:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <a href="mailto:${validatedData.email}" style="color: #3b82f6; text-decoration: none;">${validatedData.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569;">Teléfono:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <a href="tel:${validatedData.phone}" style="color: #3b82f6; text-decoration: none;">${validatedData.phone}</a>
                  </td>
                </tr>
                ${
                  validatedData.participants
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569;">Participantes:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    ${validatedData.participants}
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  validatedData.preferredDate
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <strong style="color: #475569;">Fecha Preferida:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    ${new Date(validatedData.preferredDate).toLocaleDateString("es-CL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
                `
                    : ""
                }
              </table>

              <div style="margin-top: 30px;">
                <h3 style="color: #0f172a; margin-bottom: 10px; font-size: 16px;">Mensaje:</h3>
                <div style="background-color: #f8f9fa; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px;">
                  <p style="margin: 0; white-space: pre-wrap;">${validatedData.message}</p>
                </div>
              </div>
            </div>

            <div style="margin-top: 20px; padding: 20px; text-align: center; color: #94a3b8; font-size: 14px;">
              <p style="margin: 0;">Este mensaje fue enviado desde el formulario de contacto de Outdoor Ñuble</p>
            </div>
          </body>
        </html>
      `,
      replyTo: validatedData.email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Error al enviar el email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos", details: error.issues }, { status: 400 });
    }

    console.error("Error in contact API:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
