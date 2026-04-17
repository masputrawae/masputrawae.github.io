// src/lib/formatted-date.ts

import { SITE } from '../../site.config'

export function formattedDate(date: Date): string {
  return new Intl.DateTimeFormat(SITE.locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
