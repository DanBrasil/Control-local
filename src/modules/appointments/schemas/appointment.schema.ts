import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((value) => {
    if (!value) {
      return undefined;
    }

    return value;
  });

export const appointmentSchema = z.object({
  patientId: z.string().trim().min(1, "Paciente obrigatorio"),
  date: z.string().trim().min(1, "Data obrigatoria"),
  time: z.string().trim().min(1, "Horario obrigatorio"),
  value: z.coerce.number().gt(0, "Valor deve ser maior que zero"),
  status: z.enum(["scheduled", "completed", "cancelled"], {
    message: "Status da sessao obrigatorio",
  }),
  paymentStatus: z.enum(["paid", "pending"], {
    message: "Status do pagamento obrigatorio",
  }),
  notes: optionalText,
});

export type AppointmentSchemaInput = z.input<typeof appointmentSchema>;
export type AppointmentSchemaData = z.output<typeof appointmentSchema>;
