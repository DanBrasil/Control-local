import type { Appointment } from "../../appointments/types/appointment.types";
import type { Patient } from "../../patients/types/patient.types";
import {
  calculateFinancialSummary,
  isAppointmentInPeriod,
} from "../../financial/utils/financial-calculations";
import type {
  DashboardAppointmentItem,
  DashboardData,
} from "../types/dashboard.types";

const toLocalIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const toSortableDateTime = (appointment: Appointment): string => {
  return `${appointment.date}T${appointment.time}`;
};

const byDateTimeAsc = (left: Appointment, right: Appointment): number => {
  return toSortableDateTime(left).localeCompare(toSortableDateTime(right));
};

const mapAppointmentItem = (
  appointment: Appointment,
  patientsMap: Record<string, string>,
): DashboardAppointmentItem => {
  return {
    id: appointment.id,
    patientName: patientsMap[appointment.patientId] ?? "Paciente removido",
    date: appointment.date,
    time: appointment.time,
    value: appointment.value,
    status: appointment.status,
    paymentStatus: appointment.paymentStatus,
  };
};

export const buildDashboardData = (
  appointments: Appointment[],
  patients: Patient[],
): DashboardData => {
  const now = new Date();
  const todayIso = toLocalIsoDate(now);

  const patientsMap = patients.reduce<Record<string, string>>(
    (accumulator, patient) => {
      accumulator[patient.id] = patient.name;
      return accumulator;
    },
    {},
  );

  const activePatients = patients.filter(
    (patient) => patient.status === "active",
  ).length;
  const inactivePatients = patients.filter(
    (patient) => patient.status === "inactive",
  ).length;

  const todayAppointmentsRaw = appointments
    .filter((appointment) => {
      return (
        appointment.status === "scheduled" && appointment.date === todayIso
      );
    })
    .toSorted(byDateTimeAsc);

  const monthAppointments = appointments.filter((appointment) => {
    return isAppointmentInPeriod(
      appointment,
      now.getMonth() + 1,
      now.getFullYear(),
    );
  });

  const monthCompletedAppointments = monthAppointments.filter((appointment) => {
    return appointment.status === "completed";
  }).length;

  const monthFinancial = calculateFinancialSummary(monthAppointments);

  const upcomingAppointmentsRaw = appointments
    .filter((appointment) => {
      return (
        appointment.status === "scheduled" &&
        toSortableDateTime(appointment) >= `${todayIso}T00:00`
      );
    })
    .toSorted(byDateTimeAsc)
    .slice(0, 5);

  const pendingPaymentsRaw = appointments
    .filter((appointment) => {
      return (
        appointment.status !== "cancelled" &&
        appointment.paymentStatus === "pending"
      );
    })
    .toSorted(byDateTimeAsc)
    .slice(0, 5);

  return {
    summary: {
      activePatients,
      inactivePatients,
      todayScheduledAppointments: todayAppointmentsRaw.length,
      monthCompletedAppointments,
      monthReceivedValue: monthFinancial.totalReceived,
      monthPendingValue: monthFinancial.totalPending,
    },
    todayAppointments: todayAppointmentsRaw.map((appointment) => {
      return mapAppointmentItem(appointment, patientsMap);
    }),
    upcomingAppointments: upcomingAppointmentsRaw.map((appointment) => {
      return mapAppointmentItem(appointment, patientsMap);
    }),
    pendingPayments: pendingPaymentsRaw.map((appointment) => {
      return mapAppointmentItem(appointment, patientsMap);
    }),
  };
};
