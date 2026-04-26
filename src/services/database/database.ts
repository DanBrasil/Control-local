import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Appointment } from "../../modules/appointments/types/appointment.types";
import type { Patient } from "../../modules/patients/types/patient.types";

interface PsiAgendaDatabase extends DBSchema {
  patients: {
    key: string;
    value: Patient;
  };
  appointments: {
    key: string;
    value: Appointment;
  };
}

const DATABASE_NAME = "psiagenda-local-db";
const DATABASE_VERSION = 2;

let databasePromise: Promise<IDBPDatabase<PsiAgendaDatabase>> | null = null;

export const getDatabase = async (): Promise<
  IDBPDatabase<PsiAgendaDatabase>
> => {
  if (!databasePromise) {
    databasePromise = openDB<PsiAgendaDatabase>(
      DATABASE_NAME,
      DATABASE_VERSION,
      {
        upgrade(database) {
          if (!database.objectStoreNames.contains("patients")) {
            database.createObjectStore("patients", { keyPath: "id" });
          }

          if (!database.objectStoreNames.contains("appointments")) {
            database.createObjectStore("appointments", { keyPath: "id" });
          }
        },
      },
    );
  }

  return databasePromise;
};
