import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/Card";
import { ErrorState } from "../../../components/ErrorState";
import { LoadingState } from "../../../components/LoadingState";
import { PageHeader } from "../../../components/PageHeader";
import { useToast } from "../../../shared/hooks/useToast";
import { AppointmentForm } from "../components/AppointmentForm";
import type { AppointmentSchemaData } from "../schemas/appointment.schema";
import { useAppointments } from "../hooks/useAppointments";

export const AppointmentCreatePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { patients, isLoading, error, actions } = useAppointments({
    autoLoad: true,
  });

  const handleSubmit = async (values: AppointmentSchemaData) => {
    try {
      await actions.createAppointment(values);
      toast.success("Sessao cadastrada", "Agendamento salvo com sucesso.");
      navigate("/appointments");
    } catch {
      toast.error("Falha ao salvar", "Nao foi possivel cadastrar a sessao.");
    }
  };

  return (
    <>
      <PageHeader
        title="Nova sessao"
        description="Preencha os dados para registrar um novo atendimento"
      />
      {isLoading && (
        <LoadingState
          title="Carregando pacientes"
          description="Buscando opcoes para o agendamento..."
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

      {!isLoading && !error && (
        <Card>
          <AppointmentForm
            patients={patients}
            submitLabel="Salvar sessao"
            onSubmit={handleSubmit}
          />
        </Card>
      )}
    </>
  );
};
