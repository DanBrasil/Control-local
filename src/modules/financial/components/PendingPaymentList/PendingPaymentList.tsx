import type { PendingPaymentItem } from "../../types/financial.types";
import { PendingPaymentCard } from "../PendingPaymentCard";
import { ListContainer } from "./PendingPaymentList.styles";

interface PendingPaymentListProps {
  items: PendingPaymentItem[];
}

export const PendingPaymentList = ({ items }: PendingPaymentListProps) => {
  return (
    <ListContainer>
      {items.map((item) => (
        <PendingPaymentCard key={item.appointment.id} item={item} />
      ))}
    </ListContainer>
  );
};
