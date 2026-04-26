import type {
  PatientSchemaData,
  PatientSchemaInput,
} from "../../schemas/patient.schema";

export interface PatientFormProps {
  initialValues?: Partial<PatientSchemaInput>;
  submitLabel: string;
  onSubmit: (values: PatientSchemaData) => Promise<void>;
}
