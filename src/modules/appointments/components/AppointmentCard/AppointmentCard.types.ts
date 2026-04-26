import type { Appointment } from "../../types/appointment.types";

export interface AppointmentCardProps {
  appointment: Appointment;
  patientName: string;
  onEdit: (appointmentId: string) => void;
  onRemove: (appointmentId: string) => void;
}
