import { useCallback, useEffect, useMemo, useState } from "react";
import { patientService } from "../../patients/services/patient.service";
import { appointmentService } from "../services/appointment.service";
import type {
  Appointment,
  AppointmentFilters,
  AppointmentFormData,
  AppointmentPatientOption,
} from "../types/appointment.types";

interface UseAppointmentsOptions {
  autoLoad?: boolean;
}

const initialFilters: AppointmentFilters = {
  patientId: "all",
  status: "all",
  paymentStatus: "all",
  startDate: "",
  endDate: "",
};

export const useAppointments = (options: UseAppointmentsOptions = {}) => {
  const { autoLoad = true } = options;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<AppointmentPatientOption[]>([]);
  const [filters, setFilters] = useState<AppointmentFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  const loadAppointments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [appointmentsData, patientsData] = await Promise.all([
        appointmentService.findAll(),
        patientService.findAll(),
      ]);

      setAppointments(appointmentsData);
      setPatients(
        patientsData.map((patient) => ({ id: patient.id, name: patient.name })),
      );
    } catch {
      setError("Nao foi possivel carregar as sessoes.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!autoLoad) {
      return;
    }

    void loadAppointments();
  }, [autoLoad, loadAppointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const patientMatches =
        filters.patientId === "all" ||
        appointment.patientId === filters.patientId;
      const statusMatches =
        filters.status === "all" || appointment.status === filters.status;
      const paymentMatches =
        filters.paymentStatus === "all" ||
        appointment.paymentStatus === filters.paymentStatus;
      const startMatches =
        !filters.startDate ||
        new Date(appointment.date) >= new Date(filters.startDate);
      const endMatches =
        !filters.endDate ||
        new Date(appointment.date) <= new Date(filters.endDate);

      return (
        patientMatches &&
        statusMatches &&
        paymentMatches &&
        startMatches &&
        endMatches
      );
    });
  }, [appointments, filters]);

  const getPatientNameById = (patientId: string): string => {
    const patient = patients.find((item) => item.id === patientId);
    return patient?.name ?? "Paciente removido";
  };

  const createAppointment = async (payload: AppointmentFormData) => {
    await appointmentService.create(payload);
    if (autoLoad) {
      await loadAppointments();
    }
  };

  const updateAppointment = async (
    appointmentId: string,
    payload: AppointmentFormData,
  ) => {
    await appointmentService.update(appointmentId, payload);
    if (autoLoad) {
      await loadAppointments();
    }
  };

  const removeAppointment = async (appointmentId: string) => {
    await appointmentService.remove(appointmentId);
    if (autoLoad) {
      await loadAppointments();
    }
  };

  const getAppointmentById = (appointmentId: string) => {
    return appointmentService.findById(appointmentId);
  };

  return {
    appointments,
    filteredAppointments,
    patients,
    filters,
    isLoading,
    error,
    actions: {
      setFilters,
      loadAppointments,
      createAppointment,
      updateAppointment,
      removeAppointment,
      getAppointmentById,
      getPatientNameById,
    },
  };
};
