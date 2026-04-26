import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/Card";
import { PageHeader } from "../../../components/PageHeader";
import { useToast } from "../../../shared/hooks/useToast";
import { PatientForm } from "../components/PatientForm";
import type { PatientSchemaData } from "../schemas/patient.schema";
import { usePatients } from "../hooks/usePatients";

export const PatientCreatePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { actions } = usePatients({ autoLoad: false });

  const handleSubmit = async (values: PatientSchemaData) => {
    try {
      await actions.createPatient(values);
      toast.success("Paciente cadastrado", "Registro salvo com sucesso.");
      navigate("/patients");
    } catch {
      toast.error("Falha ao salvar", "Nao foi possivel cadastrar o paciente.");
    }
  };

  return (
    <>
      <PageHeader
        title="Novo paciente"
        description="Preencha os dados para cadastrar um novo paciente"
      />
      <Card>
        <PatientForm submitLabel="Salvar paciente" onSubmit={handleSubmit} />
      </Card>
    </>
  );
};
