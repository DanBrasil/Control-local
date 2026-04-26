import type { Patient } from "../../types/patient.types";

export interface PatientCardProps {
  patient: Patient;
  onEdit: (patientId: string) => void;
  onRemove: (patientId: string) => void;
}
