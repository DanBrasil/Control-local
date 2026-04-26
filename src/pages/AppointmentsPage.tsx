import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PageHeader } from "../components/PageHeader";

export const AppointmentsPage = () => {
  return (
    <>
      <PageHeader
        title="Agenda"
        description="Estrutura inicial para o gerenciamento de sessoes"
        action={<Button variant="primary">Nova sessao</Button>}
      />
      <Card>Area preparada para listagem e controle de horarios.</Card>
    </>
  );
};
