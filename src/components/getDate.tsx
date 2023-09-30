import { LocalDate, DateTimeFormatter } from '@js-joda/core'
import { getUtcDate } from 'lib/getUtcDate'
import { queryString } from 'lib/queryString'

export const getDate = () => {
  const date = queryString('date')
  if (isDate(date)) return date
  else return LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE)
}

/**
 * returns true if this is a valid date in the format YYYY-MM-DD
 */
const isDate = (date: string) => {
  if (date.length !== 10) return false
  try {
    const [year, month, day] = date.split('-')
    return new Date(Number(year), Number(month) - 1, Number(day))
  } catch (error) {
    return false
  }
}
