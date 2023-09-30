import { LocalDate, DateTimeFormatter } from '@js-joda/core'

export const getUtcDate = () => LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE)
