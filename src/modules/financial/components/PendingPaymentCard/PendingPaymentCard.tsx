import { Card } from "../../../../components/Card";
import { formatCurrency } from "../../../../shared/utils/currency";
import { formatDate } from "../../../../shared/utils/date";
import type { PendingPaymentItem } from "../../types/financial.types";
import { Content, Meta, Title } from "./PendingPaymentCard.styles";

interface PendingPaymentCardProps {
  item: PendingPaymentItem;
}

export const PendingPaymentCard = ({ item }: PendingPaymentCardProps) => {
  return (
    <Card>
      <Content>
        <Title>{item.patientName}</Title>
        <Meta>{`${formatDate(item.appointment.date)} as ${item.appointment.time}`}</Meta>
        <Meta>{`Valor pendente: ${formatCurrency(item.appointment.value)}`}</Meta>
      </Content>
    </Card>
  );
};
