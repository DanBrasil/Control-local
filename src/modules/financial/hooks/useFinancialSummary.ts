import { useCallback, useEffect, useMemo, useState } from "react";
import { appointmentService } from "../../appointments/services/appointment.service";
import { patientService } from "../../patients/services/patient.service";
import type { Appointment } from "../../appointments/types/appointment.types";
import type {
  FinancialMonthOption,
  FinancialPeriod,
  PendingPaymentItem,
} from "../types/financial.types";
import {
  calculateFinancialSummary,
  isAppointmentInPeriod,
} from "../utils/financial-calculations";

const now = new Date();

const monthOptions: FinancialMonthOption[] = [
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Marco" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" },
];

const initialPeriod: FinancialPeriod = {
  month: now.getMonth() + 1,
  year: now.getFullYear(),
};

export const useFinancialSummary = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patientsMap, setPatientsMap] = useState<Record<string, string>>({});
  const [period, setPeriod] = useState<FinancialPeriod>(initialPeriod);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [appointmentsData, patientsData] = await Promise.all([
        appointmentService.findAll(),
        patientService.findAll(),
      ]);

      const nextPatientsMap = patientsData.reduce<Record<string, string>>(
        (accumulator, patient) => {
          accumulator[patient.id] = patient.name;
          return accumulator;
        },
        {},
      );

      setAppointments(appointmentsData);
      setPatientsMap(nextPatientsMap);
    } catch {
      setError("Nao foi possivel carregar os indicadores financeiros.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const appointmentsInPeriod = useMemo(() => {
    return appointments.filter((appointment) => {
      return isAppointmentInPeriod(appointment, period.month, period.year);
    });
  }, [appointments, period.month, period.year]);

  const summary = useMemo(() => {
    return calculateFinancialSummary(appointmentsInPeriod);
  }, [appointmentsInPeriod]);

  const pendingPayments = useMemo<PendingPaymentItem[]>(() => {
    return appointmentsInPeriod
      .filter((appointment) => {
        return (
          appointment.status !== "cancelled" &&
          appointment.paymentStatus === "pending"
        );
      })
      .map((appointment) => ({
        appointment,
        patientName: patientsMap[appointment.patientId] ?? "Paciente removido",
      }));
  }, [appointmentsInPeriod, patientsMap]);

  const yearOptions = useMemo(() => {
    const years = new Set<number>([
      now.getFullYear() - 1,
      now.getFullYear(),
      now.getFullYear() + 1,
    ]);

    appointments.forEach((appointment) => {
      years.add(new Date(`${appointment.date}T00:00:00`).getFullYear());
    });

    return Array.from(years).sort((a, b) => b - a);
  }, [appointments]);

  return {
    isLoading,
    error,
    period,
    summary,
    pendingPayments,
    monthOptions,
    yearOptions,
    actions: {
      setPeriod,
      reload: loadData,
    },
  };
};
