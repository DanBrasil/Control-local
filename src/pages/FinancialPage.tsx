import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PageHeader } from "../components/PageHeader";

export const FinancialPage = () => {
  return (
    <>
      <PageHeader
        title="Financeiro"
        description="Base visual para receitas, despesas e pagamentos"
        action={<Button variant="secondary">Exportar</Button>}
      />
      <Card>
        Estrutura inicial para o fluxo financeiro com foco em simplicidade e
        escala.
      </Card>
    </>
  );
};
