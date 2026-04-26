import { getDatabase } from "../../../services/database/database";
import type { Patient, PatientFormData } from "../types/patient.types";

const STORE_NAME = "patients";

const nowIso = (): string => new Date().toISOString();

export const patientService = {
  async findAll(): Promise<Patient[]> {
    const database = await getDatabase();
    const patients = await database.getAll(STORE_NAME);

    return patients.toSorted((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  },

  async findById(patientId: string): Promise<Patient | null> {
    const database = await getDatabase();
    const patient = await database.get(STORE_NAME, patientId);

    return patient ?? null;
  },

  async create(payload: PatientFormData): Promise<Patient> {
    const database = await getDatabase();
    const timestamp = nowIso();
    const patient: Patient = {
      id: crypto.randomUUID(),
      ...payload,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await database.add(STORE_NAME, patient);
    return patient;
  },

  async update(patientId: string, payload: PatientFormData): Promise<Patient> {
    const database = await getDatabase();
    const current = await database.get(STORE_NAME, patientId);

    if (!current) {
      throw new Error("Paciente nao encontrado");
    }

    const updatedPatient: Patient = {
      ...current,
      ...payload,
      updatedAt: nowIso(),
    };

    await database.put(STORE_NAME, updatedPatient);
    return updatedPatient;
  },

  async remove(patientId: string): Promise<void> {
    const database = await getDatabase();
    await database.delete(STORE_NAME, patientId);
  },
};
