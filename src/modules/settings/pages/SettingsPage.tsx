import { useMemo, useState } from "react";
import styled from "styled-components";
import { ErrorState } from "../../../components/ErrorState";
import { LoadingState } from "../../../components/LoadingState";
import { PageHeader } from "../../../components/PageHeader";
import { useConfirmDialog } from "../../../shared/hooks/useConfirmDialog";
import { useToast } from "../../../shared/hooks/useToast";
import { downloadJsonFile, readFileAsText } from "../../../shared/utils/file";
import { validateBackupPayload } from "../../../shared/utils/json-validation";
import { backupService } from "../../../services/backup/backup.service";
import { BackupSection } from "../components/BackupSection";
import { ImportSection, type ImportMode } from "../components/ImportSection";

const SectionsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const buildExportFileName = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");

  return `psiagenda-backup-${year}${month}${day}-${hour}${minute}.json`;
};

export const SettingsPage = () => {
  const toast = useToast();
  const { confirm } = useConfirmDialog();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mode, setMode] = useState<ImportMode>("merge");
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedFileName = useMemo(() => {
    return selectedFile?.name ?? "";
  }, [selectedFile]);

  const handleExport = async () => {
    try {
      setError(null);
      setIsExporting(true);

      const payload = await backupService.exportBackup();
      downloadJsonFile(payload, buildExportFileName());

      toast.success("Backup exportado", "Arquivo JSON baixado com sucesso.");
    } catch {
      const message = "Nao foi possivel exportar os dados.";
      setError(message);
      toast.error("Falha na exportacao", message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast.info("Selecione um arquivo", "Escolha um JSON para importar.");
      return;
    }

    try {
      setError(null);
      setIsImporting(true);

      const rawFileContent = await readFileAsText(selectedFile);
      const parsed = JSON.parse(rawFileContent) as unknown;
      const validation = validateBackupPayload(parsed);

      if (!validation.isValid || !validation.data) {
        throw new Error(validation.error ?? "Arquivo JSON invalido.");
      }

      if (mode === "replace") {
        const shouldReplace = await confirm({
          title: "Substituir dados atuais",
          description:
            "Esta acao vai sobrescrever todos os dados atuais por aqueles do arquivo selecionado. Deseja continuar?",
          confirmLabel: "Substituir",
          cancelLabel: "Cancelar",
        });

        if (!shouldReplace) {
          setIsImporting(false);
          return;
        }
      }

      const result = await backupService.importBackup({
        payload: validation.data,
        mode,
      });

      const skipMessage =
        result.skippedAppointments > 0
          ? ` ${result.skippedAppointments} sessao(oes) ignorada(s) por paciente ausente.`
          : "";

      toast.success(
        "Importacao concluida",
        `${result.importedPatients} pacientes e ${result.importedAppointments} sessoes importados.${skipMessage}`,
      );

      setSelectedFile(null);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Nao foi possivel importar o arquivo.";

      setError(message);
      toast.error("Falha na importacao", message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Configuracoes"
        description="Gerencie backup e importacao dos dados locais"
      />

      {(isExporting || isImporting) && (
        <LoadingState
          title="Processando arquivo"
          description="Aguarde enquanto os dados sao processados."
        />
      )}

      {error && (
        <ErrorState
          description={error}
          actionLabel="Limpar erro"
          onAction={() => setError(null)}
        />
      )}

      <SectionsGrid>
        <BackupSection isExporting={isExporting} onExport={handleExport} />
        <ImportSection
          selectedFileName={selectedFileName}
          mode={mode}
          isImporting={isImporting}
          onFileChange={setSelectedFile}
          onModeChange={setMode}
          onImport={() => {
            void handleImport();
          }}
        />
      </SectionsGrid>
    </>
  );
};
