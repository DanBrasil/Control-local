import { getDatabase } from "../../../services/database/database";
import type {
  Appointment,
  AppointmentFormData,
} from "../types/appointment.types";

const STORE_NAME = "appointments";

const nowIso = (): string => new Date().toISOString();

export const appointmentService = {
  async findAll(): Promise<Appointment[]> {
    const database = await getDatabase();
    const appointments = await database.getAll(STORE_NAME);

    return appointments.toSorted((a, b) => {
      const dateDiff = a.date.localeCompare(b.date);
      if (dateDiff !== 0) {
        return dateDiff;
      }

      return a.time.localeCompare(b.time);
    });
  },

  async findById(appointmentId: string): Promise<Appointment | null> {
    const database = await getDatabase();
    const appointment = await database.get(STORE_NAME, appointmentId);

    return appointment ?? null;
  },

  async create(payload: AppointmentFormData): Promise<Appointment> {
    const database = await getDatabase();
    const timestamp = nowIso();
    const appointment: Appointment = {
      id: crypto.randomUUID(),
      ...payload,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await database.add(STORE_NAME, appointment);
    return appointment;
  },

  async update(
    appointmentId: string,
    payload: AppointmentFormData,
  ): Promise<Appointment> {
    const database = await getDatabase();
    const current = await database.get(STORE_NAME, appointmentId);

    if (!current) {
      throw new Error("Sessao nao encontrada");
    }

    const updatedAppointment: Appointment = {
      ...current,
      ...payload,
      updatedAt: nowIso(),
    };

    await database.put(STORE_NAME, updatedAppointment);
    return updatedAppointment;
  },

  async remove(appointmentId: string): Promise<void> {
    const database = await getDatabase();
    await database.delete(STORE_NAME, appointmentId);
  },
};
