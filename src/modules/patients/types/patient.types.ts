export type PatientStatus = "active" | "inactive";

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  birthDate?: string;
  sessionValue: number;
  defaultWeekDay?: number;
  defaultTime?: string;
  status: PatientStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientFormData {
  name: string;
  phone: string;
  email?: string;
  birthDate?: string;
  sessionValue: number;
  defaultWeekDay?: number;
  defaultTime?: string;
  status: PatientStatus;
  notes?: string;
}

export type PatientFilterStatus = "all" | PatientStatus;

export interface PatientsFilters {
  search: string;
  status: PatientFilterStatus;
}
