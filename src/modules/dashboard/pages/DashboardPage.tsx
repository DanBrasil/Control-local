import styled from "styled-components";
import { ErrorState } from "../../../components/ErrorState";
import { LoadingState } from "../../../components/LoadingState";
import { PageHeader } from "../../../components/PageHeader";
import { media } from "../../../styles/media";
import { DashboardSummaryCard } from "../components/DashboardSummaryCard";
import { PaymentPendingPreview } from "../components/PaymentPendingPreview";
import { TodayAppointments } from "../components/TodayAppointments";
import { UpcomingAppointments } from "../components/UpcomingAppointments";
import { useDashboardSummary } from "../hooks/useDashboardSummary";

const SectionsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: 1fr;

  ${media.up("tablet")`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${media.up("desktop")`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `}
`;

export const DashboardPage = () => {
  const { isLoading, error, dashboard, actions } = useDashboardSummary();

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visao geral integrada de pacientes, agenda e financeiro"
      />

      {isLoading && (
        <LoadingState
          title="Carregando dashboard"
          description="Consolidando dados de pacientes, agenda e financeiro..."
        />
      )}

      {!isLoading && error && (
        <ErrorState
          description={error}
          actionLabel="Recarregar"
          onAction={() => {
            void actions.reload();
          }}
        />
      )}

      {!isLoading && !error && (
        <>
          <DashboardSummaryCard summary={dashboard.summary} />
          <SectionsGrid>
            <TodayAppointments appointments={dashboard.todayAppointments} />
            <UpcomingAppointments
              appointments={dashboard.upcomingAppointments}
            />
            <PaymentPendingPreview appointments={dashboard.pendingPayments} />
          </SectionsGrid>
        </>
      )}
    </>
  );
};
