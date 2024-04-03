import { format } from "date-fns";

export function formatDateOnly(date: Date | null) {
  if (date === null) return null;
  return format(date, 'yyyy-MM-dd')
}
