export function formatDate(
  isoDate: string,
  options?: Intl.DateTimeFormatOptions
) {
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    ...options,
  }).format(date);
}
