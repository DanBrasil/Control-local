import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../../components/Card";
import { LoadingState } from "../../../components/LoadingState";
import { PageHeader } from "../../../components/PageHeader";
import { useToast } from "../../../shared/hooks/useToast";
import { AppointmentForm } from "../components/AppointmentForm";
import type { AppointmentSchemaData } from "../schemas/appointment.schema";
import { useAppointments } from "../hooks/useAppointments";
import type { Appointment } from "../types/appointment.types";

export const AppointmentEditPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { patients, actions } = useAppointments({ autoLoad: true });
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAppointment = async () => {
      if (!appointmentId) {
        navigate("/appointments");
        return;
      }

      const data = await actions.getAppointmentById(appointmentId);
      if (!data) {
        toast.error(
          "Sessao nao encontrada",
          "O agendamento solicitado nao existe.",
        );
        navigate("/appointments");
        return;
      }

      setAppointment(data);
      setIsLoading(false);
    };

    void loadAppointment();
  }, [actions, appointmentId, navigate, toast]);

  const handleSubmit = async (values: AppointmentSchemaData) => {
    if (!appointmentId) {
      return;
    }

    try {
      await actions.updateAppointment(appointmentId, values);
      toast.success("Sessao atualizada", "Alteracoes salvas com sucesso.");
      navigate("/appointments");
    } catch {
      toast.error("Falha ao atualizar", "Nao foi possivel atualizar a sessao.");
    }
  };

  if (isLoading) {
    return (
      <LoadingState
        title="Carregando sessao"
        description="Buscando dados do agendamento selecionado..."
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Editar sessao"
        description="Atualize os dados da sessao selecionada"
      />
      <Card>
        <AppointmentForm
          patients={patients}
          initialValues={appointment ?? undefined}
          submitLabel="Atualizar sessao"
          onSubmit={handleSubmit}
        />
      </Card>
    </>
  );
};
