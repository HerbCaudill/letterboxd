import { DateTimeFormatter, LocalDate } from '@js-joda/core'

export const datePlus = (date: string, days: number) => {
  const localDate = LocalDate.parse(date)
  const newDate = localDate.plusDays(days)
  return newDate.format(DateTimeFormatter.ISO_LOCAL_DATE)
}
