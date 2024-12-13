import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format } from "date-fns";

export function generateCalendarDays(currentDate) {
  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let date = start;

  while (date <= end) {
    days.push(date);
    date = addDays(date, 1);
  }
  return days;
}

export function isSameDay(date1, date2) {
  return format(date1, "yyyy-MM-dd") === format(date2, "yyyy-MM-dd");
}
