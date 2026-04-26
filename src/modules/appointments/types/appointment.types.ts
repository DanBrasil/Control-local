export type AppointmentStatus = "scheduled" | "completed" | "cancelled";
export type PaymentStatus = "paid" | "pending";

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  value: number;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentFormData {
  patientId: string;
  date: string;
  time: string;
  value: number;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
}

export interface AppointmentFilters {
  patientId: string;
  status: "all" | AppointmentStatus;
  paymentStatus: "all" | PaymentStatus;
  startDate: string;
  endDate: string;
}

export interface AppointmentPatientOption {
  id: string;
  name: string;
}
