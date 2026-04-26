import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { formatCurrency } from "../../../../shared/utils/currency";
import { formatPhone } from "../../../../shared/utils/phone";
import {
  Actions,
  CardContent,
  Meta,
  Name,
  StatusBadge,
} from "./PatientCard.styles";
import type { PatientCardProps } from "./PatientCard.types";

export const PatientCard = ({
  patient,
  onEdit,
  onRemove,
}: PatientCardProps) => {
  return (
    <Card>
      <CardContent>
        <Name>{patient.name}</Name>
        <Meta>Telefone: {formatPhone(patient.phone)}</Meta>
        <Meta>Valor da sessao: {formatCurrency(patient.sessionValue)}</Meta>
        <StatusBadge $status={patient.status}>
          {patient.status === "active" ? "Ativo" : "Inativo"}
        </StatusBadge>
        <Actions>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(patient.id)}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onRemove(patient.id)}
          >
            Remover
          </Button>
        </Actions>
      </CardContent>
    </Card>
  );
};
