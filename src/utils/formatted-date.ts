// PATH: src/lib/formatted-date.ts

import { SITE } from '@config';

export function formattedDate(date: Date, locale: string = SITE.locale): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
