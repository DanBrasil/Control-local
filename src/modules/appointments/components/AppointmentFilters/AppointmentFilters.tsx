import { Input } from "../../../../components/Input";
import type {
  AppointmentFilters as AppointmentFiltersType,
  AppointmentPatientOption,
} from "../../types/appointment.types";
import {
  FilterGroup,
  FiltersGrid,
  Label,
  Select,
} from "./AppointmentFilters.styles";

interface AppointmentFiltersProps {
  filters: AppointmentFiltersType;
  patients: AppointmentPatientOption[];
  onChange: (nextFilters: AppointmentFiltersType) => void;
}

export const AppointmentFilters = ({
  filters,
  patients,
  onChange,
}: AppointmentFiltersProps) => {
  return (
    <FiltersGrid>
      <FilterGroup>
        <Label htmlFor="patient-filter">Paciente</Label>
        <Select
          id="patient-filter"
          value={filters.patientId}
          onChange={(event) =>
            onChange({ ...filters, patientId: event.target.value })
          }
        >
          <option value="all">Todos pacientes</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label htmlFor="status-filter">Status da sessao</Label>
        <Select
          id="status-filter"
          value={filters.status}
          onChange={(event) =>
            onChange({
              ...filters,
              status: event.target.value as AppointmentFiltersType["status"],
            })
          }
        >
          <option value="all">Todos</option>
          <option value="scheduled">Agendada</option>
          <option value="completed">Concluida</option>
          <option value="cancelled">Cancelada</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label htmlFor="payment-filter">Status do pagamento</Label>
        <Select
          id="payment-filter"
          value={filters.paymentStatus}
          onChange={(event) =>
            onChange({
              ...filters,
              paymentStatus: event.target
                .value as AppointmentFiltersType["paymentStatus"],
            })
          }
        >
          <option value="all">Todos</option>
          <option value="pending">Pendente</option>
          <option value="paid">Pago</option>
        </Select>
      </FilterGroup>

      <Input
        label="Data inicial"
        type="date"
        value={filters.startDate}
        onChange={(event) =>
          onChange({ ...filters, startDate: event.target.value })
        }
        fullWidth
      />

      <Input
        label="Data final"
        type="date"
        value={filters.endDate}
        onChange={(event) =>
          onChange({ ...filters, endDate: event.target.value })
        }
        fullWidth
      />
    </FiltersGrid>
  );
};
