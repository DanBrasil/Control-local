import type { AppointmentPatientOption } from "../../types/appointment.types";
import type {
  AppointmentSchemaData,
  AppointmentSchemaInput,
} from "../../schemas/appointment.schema";

export interface AppointmentFormProps {
  patients: AppointmentPatientOption[];
  initialValues?: Partial<AppointmentSchemaInput>;
  submitLabel: string;
  onSubmit: (values: AppointmentSchemaData) => Promise<void>;
}
