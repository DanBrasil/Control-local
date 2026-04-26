export const readFileAsText = (file: File): Promise<string> => {
  return file.text();
};

export const downloadJsonFile = (payload: unknown, fileName: string): void => {
  const content = JSON.stringify(payload, null, 2);
  const blob = new Blob([content], { type: "application/json" });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.click();

  URL.revokeObjectURL(objectUrl);
};
