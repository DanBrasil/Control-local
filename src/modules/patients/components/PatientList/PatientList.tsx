import type { Patient } from "../../types/patient.types";
import { PatientCard } from "../PatientCard";
import { ListContainer } from "./PatientList.styles";

interface PatientListProps {
  patients: Patient[];
  onEdit: (patientId: string) => void;
  onRemove: (patientId: string) => void;
}

export const PatientList = ({
  patients,
  onEdit,
  onRemove,
}: PatientListProps) => {
  return (
    <ListContainer>
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </ListContainer>
  );
};
