import type { Appointment } from "../../modules/appointments/types/appointment.types";
import { appointmentService } from "../../modules/appointments/services/appointment.service";
import type { Patient } from "../../modules/patients/types/patient.types";
import { patientService } from "../../modules/patients/services/patient.service";
import { getDatabase } from "../database/database";
import type { BackupPayload } from "../../shared/utils/json-validation";

type ImportMode = "replace" | "merge";

interface ImportBackupInput {
  payload: BackupPayload;
  mode: ImportMode;
}

interface ImportBackupResult {
  importedPatients: number;
  importedAppointments: number;
  skippedAppointments: number;
}

const nowIso = (): string => new Date().toISOString();

const ensurePatientShape = (patient: Patient, id: string): Patient => {
  const timestamp = nowIso();

  return {
    ...patient,
    id,
    createdAt: patient.createdAt || timestamp,
    updatedAt: patient.updatedAt || timestamp,
  };
};

const ensureAppointmentShape = (
  appointment: Appointment,
  id: string,
  patientId: string,
): Appointment => {
  const timestamp = nowIso();

  return {
    ...appointment,
    id,
    patientId,
    createdAt: appointment.createdAt || timestamp,
    updatedAt: appointment.updatedAt || timestamp,
  };
};

export const backupService = {
  async exportBackup(): Promise<BackupPayload> {
    const [patients, appointments] = await Promise.all([
      patientService.findAll(),
      appointmentService.findAll(),
    ]);

    return {
      patients,
      appointments,
    };
  },

  async importBackup({
    payload,
    mode,
  }: ImportBackupInput): Promise<ImportBackupResult> {
    const database = await getDatabase();

    const [currentPatients, currentAppointments] = await Promise.all([
      patientService.findAll(),
      appointmentService.findAll(),
    ]);

    const patientIdMap = new Map<string, string>();
    const usedPatientIds = new Set<string>(
      mode === "merge" ? currentPatients.map((patient) => patient.id) : [],
    );

    const normalizedPatients = payload.patients.map((patient) => {
      const nextId = usedPatientIds.has(patient.id)
        ? crypto.randomUUID()
        : patient.id;

      usedPatientIds.add(nextId);
      patientIdMap.set(patient.id, nextId);

      return ensurePatientShape(patient, nextId);
    });

    const availablePatientIds = new Set<string>([
      ...(mode === "merge" ? currentPatients.map((patient) => patient.id) : []),
      ...normalizedPatients.map((patient) => patient.id),
    ]);

    const usedAppointmentIds = new Set<string>(
      mode === "merge"
        ? currentAppointments.map((appointment) => appointment.id)
        : [],
    );

    let skippedAppointments = 0;

    const normalizedAppointments = payload.appointments.reduce<Appointment[]>(
      (accumulator, appointment) => {
        const mappedPatientId =
          patientIdMap.get(appointment.patientId) ?? appointment.patientId;

        if (!availablePatientIds.has(mappedPatientId)) {
          skippedAppointments += 1;
          return accumulator;
        }

        const nextId = usedAppointmentIds.has(appointment.id)
          ? crypto.randomUUID()
          : appointment.id;

        usedAppointmentIds.add(nextId);

        accumulator.push(
          ensureAppointmentShape(appointment, nextId, mappedPatientId),
        );

        return accumulator;
      },
      [],
    );

    const transaction = database.transaction(
      ["patients", "appointments"],
      "readwrite",
    );

    if (mode === "replace") {
      await Promise.all([
        transaction.objectStore("patients").clear(),
        transaction.objectStore("appointments").clear(),
      ]);
    }

    for (const patient of normalizedPatients) {
      await transaction.objectStore("patients").put(patient);
    }

    for (const appointment of normalizedAppointments) {
      await transaction.objectStore("appointments").put(appointment);
    }

    await transaction.done;

    return {
      importedPatients: normalizedPatients.length,
      importedAppointments: normalizedAppointments.length,
      skippedAppointments,
    };
  },
};
