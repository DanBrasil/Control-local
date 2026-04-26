import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import {
  Content,
  Description,
  FileInput,
  Footer,
  ModeLabel,
  Modes,
} from "./ImportSection.styles";

export type ImportMode = "replace" | "merge";

interface ImportSectionProps {
  selectedFileName: string;
  mode: ImportMode;
  isImporting: boolean;
  onFileChange: (file: File | null) => void;
  onModeChange: (mode: ImportMode) => void;
  onImport: () => void;
}

export const ImportSection = ({
  selectedFileName,
  mode,
  isImporting,
  onFileChange,
  onModeChange,
  onImport,
}: ImportSectionProps) => {
  return (
    <Card>
      <Content>
        <h3>Importacao de dados</h3>
        <Description>
          Importe um arquivo JSON no formato de backup para restaurar pacientes
          e sessoes.
        </Description>

        <FileInput
          type="file"
          accept="application/json"
          onChange={(event) => {
            const nextFile = event.target.files?.[0] ?? null;
            onFileChange(nextFile);
          }}
        />

        {selectedFileName && (
          <Description>Arquivo selecionado: {selectedFileName}</Description>
        )}

        <Modes>
          <ModeLabel>
            <input
              type="radio"
              name="import-mode"
              checked={mode === "merge"}
              onChange={() => onModeChange("merge")}
            />
            Mesclar com dados existentes
          </ModeLabel>
          <ModeLabel>
            <input
              type="radio"
              name="import-mode"
              checked={mode === "replace"}
              onChange={() => onModeChange("replace")}
            />
            Substituir dados atuais
          </ModeLabel>
        </Modes>

        <Footer>
          <Button type="button" onClick={onImport} disabled={isImporting}>
            {isImporting ? "Importando..." : "Importar"}
          </Button>
        </Footer>
      </Content>
    </Card>
  );
};
