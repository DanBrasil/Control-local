import { EmptyState } from "../../../components/EmptyState";
import { ErrorState } from "../../../components/ErrorState";
import { LoadingState } from "../../../components/LoadingState";
import { PageHeader } from "../../../components/PageHeader";
import { FinancialFilters } from "../components/FinancialFilters";
import { FinancialSummaryCard } from "../components/FinancialSummaryCard";
import { PendingPaymentList } from "../components/PendingPaymentList";
import { useFinancialSummary } from "../hooks/useFinancialSummary";

export const FinancialPage = () => {
  const {
    isLoading,
    error,
    period,
    summary,
    pendingPayments,
    monthOptions,
    yearOptions,
    actions,
  } = useFinancialSummary();

  return (
    <>
      <PageHeader
        title="Financeiro"
        description="Indicadores financeiros derivados das sessoes cadastradas"
      />

      <FinancialFilters
        period={period}
        monthOptions={monthOptions}
        yearOptions={yearOptions}
        onChange={actions.setPeriod}
      />

      {isLoading && (
        <LoadingState
          title="Carregando indicadores"
          description="Calculando resumo financeiro do periodo selecionado..."
        />
      )}

      {!isLoading && error && (
        <ErrorState
          description={error}
          actionLabel="Tentar novamente"
          onAction={() => {
            void actions.reload();
          }}
        />
      )}

      {!isLoading && !error && (
        <>
          <FinancialSummaryCard summary={summary} />

          <PageHeader
            title="Pendencias de pagamento"
            description="Sessoes pendentes no periodo selecionado"
          />

          {pendingPayments.length === 0 && (
            <EmptyState
              title="Sem pendencias no periodo"
              description="As sessoes do periodo selecionado estao em dia."
            />
          )}

          {pendingPayments.length > 0 && (
            <PendingPaymentList items={pendingPayments} />
          )}
        </>
      )}
    </>
  );
};
