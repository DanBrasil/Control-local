import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { AppointmentCreatePage } from "../modules/appointments/pages/AppointmentCreatePage";
import { AppointmentEditPage } from "../modules/appointments/pages/AppointmentEditPage";
import { AppointmentsPage } from "../modules/appointments/pages/AppointmentsPage";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage";
import { FinancialPage } from "../modules/financial/pages/FinancialPage";
import { PatientCreatePage } from "../modules/patients/pages/PatientCreatePage";
import { PatientEditPage } from "../modules/patients/pages/PatientEditPage";
import { PatientsPage } from "../modules/patients/pages/PatientsPage";
import { SettingsPage } from "../modules/settings/pages/SettingsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patients/new" element={<PatientCreatePage />} />
        <Route path="/patients/:patientId/edit" element={<PatientEditPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/appointments/new" element={<AppointmentCreatePage />} />
        <Route
          path="/appointments/:appointmentId/edit"
          element={<AppointmentEditPage />}
        />
        <Route path="/financial" element={<FinancialPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="/" element={<Navigate replace to="/dashboard" />} />
      <Route path="*" element={<Navigate replace to="/dashboard" />} />
    </Routes>
  );
};
