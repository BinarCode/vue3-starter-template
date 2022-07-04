import en from 'date-fns/locale/en-US'
import { format, parseISO } from 'date-fns'

export const DEFAULT_DATE_FORMAT = 'dd/MM/yy'

export function formatDate(date: Date | string, dateFormat = DEFAULT_DATE_FORMAT) {
  if (!date) {
    return '- -'
  }

  let dateToFormat: any = date
  if (typeof date === 'string') {
    dateToFormat = parseISO(date)
  }

  if (!dateToFormat.getTime || isNaN(dateToFormat.getTime())) {
    return '- -'
  }

  return format(dateToFormat, dateFormat, { locale: en })
}
