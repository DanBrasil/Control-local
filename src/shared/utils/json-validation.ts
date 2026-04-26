import type { Appointment } from "../../modules/appointments/types/appointment.types";
import type { Patient } from "../../modules/patients/types/patient.types";

export interface BackupPayload {
  patients: Patient[];
  appointments: Appointment[];
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
  data?: BackupPayload;
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isPatient = (value: unknown): value is Patient => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.phone === "string" &&
    typeof value.sessionValue === "number" &&
    (value.status === "active" || value.status === "inactive") &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
};

const isAppointment = (value: unknown): value is Appointment => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.patientId === "string" &&
    typeof value.date === "string" &&
    typeof value.time === "string" &&
    typeof value.value === "number" &&
    (value.status === "scheduled" ||
      value.status === "completed" ||
      value.status === "cancelled") &&
    (value.paymentStatus === "pending" || value.paymentStatus === "paid") &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
};

export const validateBackupPayload = (payload: unknown): ValidationResult => {
  if (!isObject(payload)) {
    return { isValid: false, error: "Arquivo JSON invalido." };
  }

  if (
    !Array.isArray(payload.patients) ||
    !Array.isArray(payload.appointments)
  ) {
    return {
      isValid: false,
      error: "Estrutura invalida: use { patients: [], appointments: [] }.",
    };
  }

  const patientsValid = payload.patients.every(isPatient);
  if (!patientsValid) {
    return {
      isValid: false,
      error: "Estrutura invalida de pacientes no arquivo.",
    };
  }

  const appointmentsValid = payload.appointments.every(isAppointment);
  if (!appointmentsValid) {
    return {
      isValid: false,
      error: "Estrutura invalida de sessoes no arquivo.",
    };
  }

  return {
    isValid: true,
    data: {
      patients: payload.patients,
      appointments: payload.appointments,
    },
  };
};
