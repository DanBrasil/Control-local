import { Card } from "../../../../components/Card";
import { formatCurrency } from "../../../../shared/utils/currency";
import type { DashboardAppointmentItem } from "../../types/dashboard.types";
import { Item, List, Meta, Title } from "./TodayAppointments.styles";

interface TodayAppointmentsProps {
  appointments: DashboardAppointmentItem[];
}

export const TodayAppointments = ({ appointments }: TodayAppointmentsProps) => {
  return (
    <Card>
      <Title>Sessoes de hoje</Title>
      {appointments.length === 0 && (
        <Meta>Nenhuma sessao agendada para hoje.</Meta>
      )}

      {appointments.length > 0 && (
        <List>
          {appointments.map((appointment) => (
            <Item key={appointment.id}>
              <Title>{appointment.patientName}</Title>
              <Meta>{`${appointment.time} - ${formatCurrency(appointment.value)}`}</Meta>
            </Item>
          ))}
        </List>
      )}
    </Card>
  );
};
