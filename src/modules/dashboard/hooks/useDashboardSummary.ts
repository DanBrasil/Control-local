import { useCallback, useEffect, useMemo, useState } from "react";
import { appointmentService } from "../../appointments/services/appointment.service";
import { patientService } from "../../patients/services/patient.service";
import { buildDashboardData } from "../utils/dashboard-calculations";

export const useDashboardSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<
    Awaited<ReturnType<typeof appointmentService.findAll>>
  >([]);
  const [patients, setPatients] = useState<
    Awaited<ReturnType<typeof patientService.findAll>>
  >([]);

  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [appointmentsData, patientsData] = await Promise.all([
        appointmentService.findAll(),
        patientService.findAll(),
      ]);

      setAppointments(appointmentsData);
      setPatients(patientsData);
    } catch {
      setError("Nao foi possivel carregar os dados do dashboard.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const dashboard = useMemo(() => {
    return buildDashboardData(appointments, patients);
  }, [appointments, patients]);

  return {
    isLoading,
    error,
    dashboard,
    actions: {
      reload: loadDashboard,
    },
  };
};
