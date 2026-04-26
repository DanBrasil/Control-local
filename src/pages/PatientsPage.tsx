import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { PageHeader } from "../components/PageHeader";

export const PatientsPage = () => {
  return (
    <>
      <PageHeader
        title="Pacientes"
        description="Base inicial para o cadastro e acompanhamento de pacientes"
      />
      <Card>
        <Input
          label="Buscar paciente"
          placeholder="Digite nome, telefone ou e-mail"
          fullWidth
          helperText="Componente de input pronto para ser reutilizado em formularios."
        />
      </Card>
    </>
  );
};
