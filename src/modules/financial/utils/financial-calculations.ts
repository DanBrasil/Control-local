import type { Appointment } from "../../appointments/types/appointment.types";
import type { FinancialSummary } from "../types/financial.types";

const isNotCancelled = (appointment: Appointment): boolean => {
  return appointment.status !== "cancelled";
};

export const isAppointmentInPeriod = (
  appointment: Appointment,
  month: number,
  year: number,
): boolean => {
  const appointmentDate = new Date(`${appointment.date}T00:00:00`);
  return (
    appointmentDate.getMonth() + 1 === month &&
    appointmentDate.getFullYear() === year
  );
};

export const calculateFinancialSummary = (
  appointments: Appointment[],
): FinancialSummary => {
  const validAppointments = appointments.filter(isNotCancelled);

  const totalExpected = validAppointments.reduce(
    (accumulator, appointment) => accumulator + appointment.value,
    0,
  );

  const paidAppointments = validAppointments.filter(
    (appointment) => appointment.paymentStatus === "paid",
  );

  const pendingAppointments = validAppointments.filter(
    (appointment) => appointment.paymentStatus === "pending",
  );

  const totalReceived = paidAppointments.reduce(
    (accumulator, appointment) => accumulator + appointment.value,
    0,
  );

  const totalPending = pendingAppointments.reduce(
    (accumulator, appointment) => accumulator + appointment.value,
    0,
  );

  return {
    totalExpected,
    totalReceived,
    totalPending,
    paidCount: paidAppointments.length,
    pendingCount: pendingAppointments.length,
  };
};
