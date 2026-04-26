import { Card } from "../../../../components/Card";
import { formatCurrency } from "../../../../shared/utils/currency";
import { formatDate } from "../../../../shared/utils/date";
import type { DashboardAppointmentItem } from "../../types/dashboard.types";
import { Item, List, Meta, Title } from "./PaymentPendingPreview.styles";

interface PaymentPendingPreviewProps {
  appointments: DashboardAppointmentItem[];
}

export const PaymentPendingPreview = ({
  appointments,
}: PaymentPendingPreviewProps) => {
  return (
    <Card>
      <Title>Pendencias de pagamento</Title>
      {appointments.length === 0 && (
        <Meta>Nao existem pendencias no momento.</Meta>
      )}

      {appointments.length > 0 && (
        <List>
          {appointments.map((appointment) => (
            <Item key={appointment.id}>
              <Title>{appointment.patientName}</Title>
              <Meta>{`${formatDate(appointment.date)} - ${formatCurrency(appointment.value)}`}</Meta>
            </Item>
          ))}
        </List>
      )}
    </Card>
  );
};
