import { Card } from "../../../../components/Card";
import { formatCurrency } from "../../../../shared/utils/currency";
import type { DashboardSummary } from "../../types/dashboard.types";
import { Label, SummaryGrid, Value } from "./DashboardSummaryCard.styles";

interface DashboardSummaryCardProps {
  summary: DashboardSummary;
}

export const DashboardSummaryCard = ({
  summary,
}: DashboardSummaryCardProps) => {
  return (
    <SummaryGrid>
      <Card>
        <Label>Pacientes ativos</Label>
        <Value>{summary.activePatients}</Value>
      </Card>
      <Card>
        <Label>Pacientes inativos</Label>
        <Value>{summary.inactivePatients}</Value>
      </Card>
      <Card>
        <Label>Sessoes hoje</Label>
        <Value>{summary.todayScheduledAppointments}</Value>
      </Card>
      <Card>
        <Label>Sessoes no mes</Label>
        <Value>{summary.monthCompletedAppointments}</Value>
      </Card>
      <Card>
        <Label>Recebido no mes</Label>
        <Value>{formatCurrency(summary.monthReceivedValue)}</Value>
      </Card>
      <Card>
        <Label>Pendente no mes</Label>
        <Value>{formatCurrency(summary.monthPendingValue)}</Value>
      </Card>
    </SummaryGrid>
  );
};
