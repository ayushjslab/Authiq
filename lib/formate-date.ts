export function formatDate(
  isoDate?: string,
  options?: Intl.DateTimeFormatOptions
) {
  if (!isoDate) return "—";

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    ...options,
  }).format(date);
}
