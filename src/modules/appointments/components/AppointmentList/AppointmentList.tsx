import type { Appointment } from "../../types/appointment.types";
import { AppointmentCard } from "../AppointmentCard";
import { ListContainer } from "./AppointmentList.styles";

interface AppointmentListProps {
  appointments: Appointment[];
  getPatientNameById: (patientId: string) => string;
  onEdit: (appointmentId: string) => void;
  onRemove: (appointmentId: string) => void;
}

export const AppointmentList = ({
  appointments,
  getPatientNameById,
  onEdit,
  onRemove,
}: AppointmentListProps) => {
  return (
    <ListContainer>
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          patientName={getPatientNameById(appointment.patientId)}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </ListContainer>
  );
};
