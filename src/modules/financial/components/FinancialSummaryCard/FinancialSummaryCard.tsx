import { Card } from "../../../../components/Card";
import { formatCurrency } from "../../../../shared/utils/currency";
import type { FinancialSummary } from "../../types/financial.types";
import {
  SummaryGrid,
  SummaryLabel,
  SummaryValue,
} from "./FinancialSummaryCard.styles";

interface FinancialSummaryCardProps {
  summary: FinancialSummary;
}

export const FinancialSummaryCard = ({
  summary,
}: FinancialSummaryCardProps) => {
  return (
    <SummaryGrid>
      <Card>
        <SummaryLabel>Total previsto</SummaryLabel>
        <SummaryValue>{formatCurrency(summary.totalExpected)}</SummaryValue>
      </Card>
      <Card>
        <SummaryLabel>Total recebido</SummaryLabel>
        <SummaryValue>{formatCurrency(summary.totalReceived)}</SummaryValue>
      </Card>
      <Card>
        <SummaryLabel>Total pendente</SummaryLabel>
        <SummaryValue>{formatCurrency(summary.totalPending)}</SummaryValue>
      </Card>
      <Card>
        <SummaryLabel>Sessoes pagas</SummaryLabel>
        <SummaryValue>{summary.paidCount}</SummaryValue>
      </Card>
      <Card>
        <SummaryLabel>Sessoes pendentes</SummaryLabel>
        <SummaryValue>{summary.pendingCount}</SummaryValue>
      </Card>
    </SummaryGrid>
  );
};
