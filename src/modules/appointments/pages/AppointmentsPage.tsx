import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { EmptyState } from "../../../components/EmptyState";
import { ErrorState } from "../../../components/ErrorState";
import { LoadingState } from "../../../components/LoadingState";
import { PageHeader } from "../../../components/PageHeader";
import { useConfirmDialog } from "../../../shared/hooks/useConfirmDialog";
import { useToast } from "../../../shared/hooks/useToast";
import { AppointmentFilters } from "../components/AppointmentFilters";
import { AppointmentList } from "../components/AppointmentList";
import { useAppointments } from "../hooks/useAppointments";

export const AppointmentsPage = () => {
  const navigate = useNavigate();
  const { filteredAppointments, filters, patients, isLoading, error, actions } =
    useAppointments();
  const { confirm } = useConfirmDialog();
  const toast = useToast();

  const handleRemove = async (appointmentId: string) => {
    const shouldRemove = await confirm({
      title: "Remover sessao",
      description:
        "Esta acao remove a sessao da agenda local. Deseja continuar?",
      confirmLabel: "Remover",
      cancelLabel: "Cancelar",
    });

    if (!shouldRemove) {
      return;
    }

    try {
      await actions.removeAppointment(appointmentId);
      toast.success("Sessao removida", "Agenda atualizada com sucesso.");
    } catch {
      toast.error("Falha ao remover", "Nao foi possivel remover a sessao.");
    }
  };

  const isEmpty = !isLoading && filteredAppointments.length === 0;

  return (
    <>
      <PageHeader
        title="Agenda"
        description="Gerencie sessoes, status de atendimento e pagamento"
        action={
          <Button onClick={() => navigate("/appointments/new")}>
            Nova sessao
          </Button>
        }
      />

      <AppointmentFilters
        filters={filters}
        patients={patients}
        onChange={actions.setFilters}
      />

      {isLoading && (
        <LoadingState
          title="Carregando sessoes"
          description="Buscando agenda no banco local..."
        />
      )}

      {!isLoading && error && (
        <ErrorState
          description={error}
          actionLabel="Tentar novamente"
          onAction={() => {
            void actions.loadAppointments();
          }}
        />
      )}

      {!isLoading && !error && isEmpty && (
        <EmptyState
          title="Nenhuma sessao encontrada"
          description="Ajuste os filtros ou crie um novo agendamento."
          actionLabel="Nova sessao"
          onAction={() => navigate("/appointments/new")}
        />
      )}

      {!isLoading && !error && filteredAppointments.length > 0 && (
        <AppointmentList
          appointments={filteredAppointments}
          getPatientNameById={actions.getPatientNameById}
          onEdit={(appointmentId) =>
            navigate(`/appointments/${appointmentId}/edit`)
          }
          onRemove={handleRemove}
        />
      )}
    </>
  );
};
