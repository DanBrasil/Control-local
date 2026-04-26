import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { Content, Description, Footer } from "./BackupSection.styles";

interface BackupSectionProps {
  isExporting: boolean;
  onExport: () => void;
}

export const BackupSection = ({
  isExporting,
  onExport,
}: BackupSectionProps) => {
  return (
    <Card>
      <Content>
        <h3>Backup local</h3>
        <Description>
          Exporte todos os dados atuais de pacientes e sessoes para um arquivo
          JSON.
        </Description>
        <Footer>
          <Button type="button" onClick={onExport} disabled={isExporting}>
            {isExporting ? "Exportando..." : "Exportar dados"}
          </Button>
        </Footer>
      </Content>
    </Card>
  );
};
