import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../../components/Button";
import { EmptyState } from "../../../components/EmptyState";
import { media } from "../../../styles/media";
import { ErrorState } from "../../../components/ErrorState";
import { Input } from "../../../components/Input";
import { LoadingState } from "../../../components/LoadingState";
import { PageHeader } from "../../../components/PageHeader";
import { useConfirmDialog } from "../../../shared/hooks/useConfirmDialog";
import { useToast } from "../../../shared/hooks/useToast";
import { PatientList } from "../components/PatientList";
import { usePatients } from "../hooks/usePatients";
import type { PatientFilterStatus } from "../types/patient.types";

const Filters = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${media.up("tablet")`
    grid-template-columns: 1fr 220px;
  `}
`;

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.surface};
`;

export const PatientsPage = () => {
  const navigate = useNavigate();
  const { filteredPatients, isLoading, error, filters, actions } =
    usePatients();
  const { confirm } = useConfirmDialog();
  const toast = useToast();

  const handleRemove = async (patientId: string) => {
    const shouldRemove = await confirm({
      title: "Remover paciente",
      description:
        "Esta acao remove o paciente do cadastro local. Deseja continuar?",
      confirmLabel: "Remover",
      cancelLabel: "Cancelar",
    });

    if (!shouldRemove) {
      return;
    }

    try {
      await actions.removePatient(patientId);
      toast.success("Paciente removido", "Cadastro atualizado com sucesso.");
    } catch {
      toast.error("Falha ao remover", "Nao foi possivel remover o paciente.");
    }
  };

  const isEmpty = !isLoading && filteredPatients.length === 0;

  return (
    <>
      <PageHeader
        title="Pacientes"
        description="Gerencie cadastro e acompanhamento dos seus pacientes"
        action={
          <Button onClick={() => navigate("/patients/new")}>
            Novo paciente
          </Button>
        }
      />

      <Filters>
        <Input
          label="Buscar por nome"
          placeholder="Digite o nome do paciente"
          value={filters.search}
          onChange={(event) => actions.setSearch(event.target.value)}
          fullWidth
        />

        <Select
          value={filters.status}
          onChange={(event) =>
            actions.setStatus(event.target.value as PatientFilterStatus)
          }
        >
          <option value="all">Todos status</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </Select>
      </Filters>

      {isLoading && (
        <LoadingState
          title="Carregando pacientes"
          description="Buscando registros locais..."
        />
      )}

      {!isLoading && error && (
        <ErrorState
          description={error}
          actionLabel="Tentar novamente"
          onAction={() => {
            void actions.loadPatients();
          }}
        />
      )}

      {!isLoading && !error && isEmpty && (
        <EmptyState
          title="Nenhum paciente encontrado"
          description="Ajuste os filtros ou cadastre um novo paciente."
          actionLabel="Novo paciente"
          onAction={() => navigate("/patients/new")}
        />
      )}

      {!isLoading && !error && filteredPatients.length > 0 && (
        <PatientList
          patients={filteredPatients}
          onEdit={(patientId) => navigate(`/patients/${patientId}/edit`)}
          onRemove={handleRemove}
        />
      )}
    </>
  );
};
