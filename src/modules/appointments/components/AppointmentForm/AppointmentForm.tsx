import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import {
  appointmentSchema,
  type AppointmentSchemaData,
  type AppointmentSchemaInput,
} from "../../schemas/appointment.schema";
import {
  ErrorText,
  FieldGroup,
  Footer,
  Form,
  Label,
  Row,
  Select,
  TextArea,
} from "./AppointmentForm.styles";
import type { AppointmentFormProps } from "./AppointmentForm.types";

export const AppointmentForm = ({
  patients,
  initialValues,
  submitLabel,
  onSubmit,
}: AppointmentFormProps) => {
  const defaultValues = useMemo<AppointmentSchemaInput>(
    () => ({
      patientId: "",
      date: "",
      time: "",
      value: 0,
      status: "scheduled",
      paymentStatus: "pending",
      notes: "",
      ...initialValues,
    }),
    [initialValues],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentSchemaInput, unknown, AppointmentSchemaData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Label htmlFor="patientId">Paciente</Label>
        <Select id="patientId" {...register("patientId")}>
          <option value="">Selecione um paciente</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </Select>
        {errors.patientId?.message && (
          <ErrorText>{errors.patientId.message}</ErrorText>
        )}
      </FieldGroup>

      <Row>
        <Input
          label="Data"
          type="date"
          fullWidth
          error={errors.date?.message}
          {...register("date")}
        />
        <Input
          label="Horario"
          type="time"
          fullWidth
          error={errors.time?.message}
          {...register("time")}
        />
      </Row>

      <Row>
        <Input
          label="Valor"
          type="number"
          step="0.01"
          fullWidth
          error={errors.value?.message}
          {...register("value")}
        />

        <FieldGroup>
          <Label htmlFor="status">Status da sessao</Label>
          <Select id="status" {...register("status")}>
            <option value="scheduled">Agendada</option>
            <option value="completed">Concluida</option>
            <option value="cancelled">Cancelada</option>
          </Select>
        </FieldGroup>
      </Row>

      <FieldGroup>
        <Label htmlFor="paymentStatus">Status do pagamento</Label>
        <Select id="paymentStatus" {...register("paymentStatus")}>
          <option value="pending">Pendente</option>
          <option value="paid">Pago</option>
        </Select>
      </FieldGroup>

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
