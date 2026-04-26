import { Card } from "../../../../components/Card";
import { formatDate } from "../../../../shared/utils/date";
import type { DashboardAppointmentItem } from "../../types/dashboard.types";
import { Item, List, Meta, Title } from "./UpcomingAppointments.styles";

interface UpcomingAppointmentsProps {
  appointments: DashboardAppointmentItem[];
}

export const UpcomingAppointments = ({
  appointments,
}: UpcomingAppointmentsProps) => {
  return (
    <Card>
      <Title>Proximas sessoes</Title>
      {appointments.length === 0 && <Meta>Nao existem proximas sessoes.</Meta>}

      {appointments.length > 0 && (
        <List>
          {appointments.map((appointment) => (
            <Item key={appointment.id}>
              <Title>{appointment.patientName}</Title>
              <Meta>{`${formatDate(appointment.date)} as ${appointment.time}`}</Meta>
            </Item>
          ))}
        </List>
      )}
    </Card>
  );
};
