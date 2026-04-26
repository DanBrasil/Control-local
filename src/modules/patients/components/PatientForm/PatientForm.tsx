import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { formatPhone } from "../../../../shared/utils/phone";
import {
  patientSchema,
  type PatientSchemaData,
  type PatientSchemaInput,
} from "../../schemas/patient.schema";
import {
  ErrorText,
  FieldGroup,
  Footer,
  Form,
  Label,
  Row,
  Select,
  TextArea,
} from "./PatientForm.styles";
import type { PatientFormProps } from "./PatientForm.types";

const weekDays = [
  { label: "Domingo", value: 0 },
  { label: "Segunda", value: 1 },
  { label: "Terca", value: 2 },
  { label: "Quarta", value: 3 },
  { label: "Quinta", value: 4 },
  { label: "Sexta", value: 5 },
  { label: "Sabado", value: 6 },
];

export const PatientForm = ({
  initialValues,
  submitLabel,
  onSubmit,
}: PatientFormProps) => {
  const initialPhone = initialValues?.phone
    ? formatPhone(initialValues.phone)
    : "";

  const defaultValues = useMemo<PatientSchemaInput>(
    () => ({
      name: "",
      email: "",
      birthDate: "",
      sessionValue: 0,
      defaultWeekDay: undefined,
      defaultTime: "",
      status: "active",
      notes: "",
      ...initialValues,
      phone: initialPhone,
    }),
    [initialPhone, initialValues],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PatientSchemaInput, unknown, PatientSchemaData>({
    resolver: zodResolver(patientSchema),
    defaultValues,
  });

  const phoneRegister = register("phone");

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Input
          label="Nome"
          fullWidth
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Telefone"
          fullWidth
          inputMode="tel"
          error={errors.phone?.message}
          {...phoneRegister}
          onChange={(event) => {
            setValue("phone", formatPhone(event.target.value), {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
      </Row>

      <Row>
        <Input
          label="E-mail"
          fullWidth
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Data de nascimento"
          type="date"
          fullWidth
          {...register("birthDate")}
        />
      </Row>

      <Row>
        <Input
          label="Valor da sessao"
          type="number"
          step="0.01"
          fullWidth
          error={errors.sessionValue?.message}
          {...register("sessionValue")}
        />
        <Input
          label="Horario padrao"
          type="time"
          fullWidth
          {...register("defaultTime")}
        />
      </Row>

      <Row>
        <FieldGroup>
          <Label htmlFor="defaultWeekDay">Dia padrao da semana</Label>
          <Select id="defaultWeekDay" {...register("defaultWeekDay")}>
            <option value="">Sem padrao</option>
            {weekDays.map((weekDay) => (
              <option key={weekDay.value} value={weekDay.value}>
                {weekDay.label}
              </option>
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="status">Status</Label>
          <Select id="status" {...register("status")}>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </Select>
          {errors.status?.message && (
            <ErrorText>{errors.status.message}</ErrorText>
          )}
        </FieldGroup>
      </Row>

      <FieldGroup>
        <Label htmlFor="notes">Observacoes</Label>
        <TextArea id="notes" {...register("notes")} />
      </FieldGroup>

      <Footer>
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </Footer>
    </Form>
  );
};
