import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../../components/Card";
import { LoadingState } from "../../../components/LoadingState";
import { PageHeader } from "../../../components/PageHeader";
import { useToast } from "../../../shared/hooks/useToast";
import { PatientForm } from "../components/PatientForm";
import type { PatientSchemaData } from "../schemas/patient.schema";
import { usePatients } from "../hooks/usePatients";
import type { Patient } from "../types/patient.types";

export const PatientEditPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { patientId } = useParams<{ patientId: string }>();
  const { actions } = usePatients({ autoLoad: false });
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPatient = async () => {
      if (!patientId) {
        navigate("/patients");
        return;
      }

      const data = await actions.getPatientById(patientId);
      if (!data) {
        toast.error(
          "Paciente nao encontrado",
          "O registro solicitado nao existe.",
        );
        navigate("/patients");
        return;
      }

      setPatient(data);
      setIsLoading(false);
    };

    void loadPatient();
  }, [actions, navigate, patientId, toast]);

  const handleSubmit = async (values: PatientSchemaData) => {
    if (!patientId) {
      return;
    }

    try {
      await actions.updatePatient(patientId, values);
      toast.success("Paciente atualizado", "Alteracoes salvas com sucesso.");
      navigate("/patients");
    } catch {
      toast.error(
        "Falha ao atualizar",
        "Nao foi possivel atualizar o paciente.",
      );
    }
  };

  if (isLoading) {
    return (
      <LoadingState
        title="Carregando paciente"
        description="Buscando dados do cadastro selecionado..."
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Editar paciente"
        description="Atualize os dados cadastrais do paciente"
      />
      <Card>
        <PatientForm
          initialValues={patient ?? undefined}
          submitLabel="Atualizar paciente"
          onSubmit={handleSubmit}
        />
      </Card>
    </>
  );
};
