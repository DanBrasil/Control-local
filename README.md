# PsiAgenda Local

Aplicação local para gestão de pacientes, sessões e controle financeiro voltado para psicólogos e profissionais autônomos.

---

## Sobre o projeto

O PsiAgenda Local foi desenvolvido para resolver um problema real: organizar atendimentos, agenda e recebimentos de forma simples, sem depender de sistemas complexos ou conexão com backend.

A aplicação funciona 100% localmente no navegador, com persistência via IndexedDB.

---

## Objetivo

Construir uma aplicação:

* Simples de usar
* Arquiteturalmente sólida
* Baseada em boas práticas de engenharia
* Preparada para evolução futura (API, autenticação, multi-tenant)

---

## Tecnologias utilizadas

* React
* TypeScript
* Vite
* Styled-components
* React Hook Form
* Zod
* date-fns
* IndexedDB (idb)

---

## Arquitetura

O projeto segue princípios de engenharia de software:

* SOLID
* Clean Code
* Separation of Concerns (SoC)
* Arquitetura baseada em domínio

### Estrutura

```txt
src/
  components/
  layout/
  modules/
    patients/
    appointments/
    financial/
    dashboard/
    settings/
  services/
    database/
    backup/
  shared/
    hooks/
    utils/
  styles/
```

---

## Persistência de dados

A aplicação utiliza IndexedDB, permitindo:

* Armazenamento local persistente
* Funcionamento offline
* Independência de backend

A camada de acesso aos dados é abstraída via services, simulando uma API.

---

## Funcionalidades

### Dashboard

* Indicadores de pacientes
* Sessões do dia
* Próximas sessões
* Pendências financeiras

### Pacientes

* Cadastro completo
* Edição e exclusão
* Status ativo/inativo
* Busca e filtros

### Agenda

* Registro de sessões
* Status (agendada, realizada, cancelada)
* Controle de pagamento

### Financeiro

* Total previsto
* Total recebido
* Total pendente
* Filtros por período

### Backup de dados

* Exportação para JSON
* Importação de dados
* Opção de substituir ou mesclar

---

## Responsividade

A aplicação foi construída com abordagem mobile-first, garantindo:

* Navegação adaptada para mobile
* Sidebar em formato drawer
* Formulários otimizados para toque
* Layout fluido e sem quebra

---

## Como rodar o projeto

```bash
npm install
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Decisões técnicas

* Uso de IndexedDB para eliminar necessidade de backend
* Services para simular API e permitir evolução futura
* Separação por domínios para escalabilidade
* Hooks para isolamento de lógica
* Zod para validação robusta de formulários
* Design system simples para consistência visual

---

## Evoluções futuras

* Backend com NestJS
* Autenticação de usuários
* Sincronização em nuvem
* Multi-tenant (white-label)
* Relatórios avançados
* Versão desktop com Tauri

---

## Status

Projeto concluído como MVP funcional com arquitetura escalável.

---

## Autor

Danilo Brasil
