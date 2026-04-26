import type {
  FinancialMonthOption,
  FinancialPeriod,
} from "../../types/financial.types";
import {
  FieldGroup,
  FiltersRow,
  Label,
  Select,
} from "./FinancialFilters.styles";

interface FinancialFiltersProps {
  period: FinancialPeriod;
  monthOptions: FinancialMonthOption[];
  yearOptions: number[];
  onChange: (nextPeriod: FinancialPeriod) => void;
}

export const FinancialFilters = ({
  period,
  monthOptions,
  yearOptions,
  onChange,
}: FinancialFiltersProps) => {
  return (
    <FiltersRow>
      <FieldGroup>
        <Label htmlFor="financial-month">Mes</Label>
        <Select
          id="financial-month"
          value={period.month}
          onChange={(event) =>
            onChange({ ...period, month: Number(event.target.value) })
          }
        >
          {monthOptions.map((monthOption) => (
            <option key={monthOption.value} value={monthOption.value}>
              {monthOption.label}
            </option>
          ))}
        </Select>
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="financial-year">Ano</Label>
        <Select
          id="financial-year"
          value={period.year}
          onChange={(event) =>
            onChange({ ...period, year: Number(event.target.value) })
          }
        >
          {yearOptions.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </Select>
      </FieldGroup>
    </FiltersRow>
  );
};
