// PATH: src/lib/formatted-date.ts

export function formattedDate(date: Date, locale: string = "id-ID"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}
