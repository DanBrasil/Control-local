import type { Appointment } from "../../appointments/types/appointment.types";

export interface FinancialPeriod {
  month: number;
  year: number;
}

export interface FinancialSummary {
  totalExpected: number;
  totalReceived: number;
  totalPending: number;
  paidCount: number;
  pendingCount: number;
}

export interface PendingPaymentItem {
  appointment: Appointment;
  patientName: string;
}

export interface FinancialMonthOption {
  value: number;
  label: string;
}
