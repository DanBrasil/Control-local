import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  PatientFilterStatus,
  PatientFormData,
  Patient,
} from "../types/patient.types";
import { patientService } from "../services/patient.service";

interface UsePatientsOptions {
  autoLoad?: boolean;
}

export const usePatients = (options: UsePatientsOptions = {}) => {
  const { autoLoad = true } = options;
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PatientFilterStatus>("all");

  const loadPatients = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await patientService.findAll();
      setPatients(data);
    } catch {
      setError("Nao foi possivel carregar os pacientes.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!autoLoad) {
      return;
    }

    void loadPatients();
  }, [autoLoad, loadPatients]);

  const filteredPatients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return patients.filter((patient) => {
      const nameMatches = patient.name.toLowerCase().includes(normalizedSearch);
      const statusMatches = status === "all" || patient.status === status;
      return nameMatches && statusMatches;
    });
  }, [patients, search, status]);

  const createPatient = async (payload: PatientFormData) => {
    await patientService.create(payload);
    if (autoLoad) {
      await loadPatients();
    }
  };

  const updatePatient = async (patientId: string, payload: PatientFormData) => {
    await patientService.update(patientId, payload);
    if (autoLoad) {
      await loadPatients();
    }
  };

  const removePatient = async (patientId: string) => {
    await patientService.remove(patientId);
    if (autoLoad) {
      await loadPatients();
    }
  };

  const getPatientById = (patientId: string) => {
    return patientService.findById(patientId);
  };

  return {
    patients,
    filteredPatients,
    isLoading,
    error,
    filters: { search, status },
    actions: {
      setSearch,
      setStatus,
      loadPatients,
      createPatient,
      updatePatient,
      removePatient,
      getPatientById,
    },
  };
};
