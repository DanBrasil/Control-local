const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const parseIsoDate = (date: string): Date => {
  return new Date(`${date}T00:00:00`);
};

const parseIsoDateTime = (date: string, time: string): Date => {
  return new Date(`${date}T${time}:00`);
};

export const formatDate = (date: string): string => {
  const parsedDate = parseIsoDate(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return dateFormatter.format(parsedDate);
};

export const formatDateTime = (date: string, time: string): string => {
  const parsedDate = parseIsoDateTime(date, time);

  if (Number.isNaN(parsedDate.getTime())) {
    return `${date} ${time}`;
  }

  return dateTimeFormatter.format(parsedDate);
};
