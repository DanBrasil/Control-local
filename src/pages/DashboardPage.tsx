import { Card } from "../components/Card";
import { PageHeader } from "../components/PageHeader";

export const DashboardPage = () => {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Visao geral da operacao local do consultorio"
      />
      <Card>
        Painel inicial para acompanhar agenda, pacientes e financeiro.
      </Card>
    </>
  );
};
