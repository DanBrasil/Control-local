import type {
  AppointmentStatus,
  PaymentStatus,
} from "../../appointments/types/appointment.types";

export interface DashboardSummary {
  activePatients: number;
  inactivePatients: number;
  todayScheduledAppointments: number;
  monthCompletedAppointments: number;
  monthReceivedValue: number;
  monthPendingValue: number;
}

export interface DashboardAppointmentItem {
  id: string;
  patientName: string;
  date: string;
  time: string;
  value: number;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
}

export interface DashboardData {
  summary: DashboardSummary;
  todayAppointments: DashboardAppointmentItem[];
  upcomingAppointments: DashboardAppointmentItem[];
  pendingPayments: DashboardAppointmentItem[];
}
