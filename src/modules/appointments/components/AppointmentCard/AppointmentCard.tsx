import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { formatCurrency } from "../../../../shared/utils/currency";
import { formatDate } from "../../../../shared/utils/date";
import {
  Actions,
  Badge,
  BadgeRow,
  CardContent,
  Meta,
  Name,
} from "./AppointmentCard.styles";
import type { AppointmentCardProps } from "./AppointmentCard.types";

const statusLabel: Record<string, string> = {
  scheduled: "Agendada",
  completed: "Concluida",
  cancelled: "Cancelada",
};

const paymentLabel: Record<string, string> = {
  pending: "Pagamento pendente",
  paid: "Pagamento pago",
};

export const AppointmentCard = ({
  appointment,
  patientName,
  onEdit,
  onRemove,
}: AppointmentCardProps) => {
  return (
    <Card>
      <CardContent>
        <Name>{patientName}</Name>
        <Meta>{`${formatDate(appointment.date)} as ${appointment.time}`}</Meta>
        <Meta>{`Valor: ${formatCurrency(appointment.value)}`}</Meta>

        <BadgeRow>
          <Badge $kind="status">{statusLabel[appointment.status]}</Badge>
          <Badge $kind="payment">
            {paymentLabel[appointment.paymentStatus]}
          </Badge>
        </BadgeRow>

        <Actions>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(appointment.id)}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onRemove(appointment.id)}
          >
            Remover
          </Button>
        </Actions>
      </CardContent>
    </Card>
  );
};
