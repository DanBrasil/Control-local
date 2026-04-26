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

const optionalEmail = z
  .string()
  .trim()
  .email("E-mail invalido")
  .or(z.literal(""))
  .optional()
  .transform((value) => {
    if (!value) {
      return undefined;
    }

    return value;
  });

const optionalWeekDay = z.preprocess((value) => {
  if (value === "" || value === undefined || value === null) {
    return undefined;
  }

  return Number(value);
}, z.number().int().min(0).max(6).optional());

export const patientSchema = z.object({
  name: z.string().trim().min(1, "Nome obrigatorio"),
  phone: z.string().trim().min(1, "Telefone obrigatorio"),
  email: optionalEmail,
  birthDate: optionalText,
  sessionValue: z.coerce
    .number()
    .gt(0, "Valor da sessao deve ser maior que zero"),
  defaultWeekDay: optionalWeekDay,
  defaultTime: optionalText,
  status: z.enum(["active", "inactive"], { message: "Status obrigatorio" }),
  notes: optionalText,
});

export type PatientSchemaInput = z.input<typeof patientSchema>;
export type PatientSchemaData = z.output<typeof patientSchema>;
