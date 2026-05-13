/** Order-time messaging for COD confirmation calls — hours in Asia/Riyadh. */
export function riyadhParts(d: Date): { hour: number; minute: number; dayMinute: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Riyadh',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(d)

  let hour = 0
  let minute = 0
  for (const p of parts) {
    if (p.type === 'hour') hour = Number.parseInt(p.value, 10)
    if (p.type === 'minute') minute = Number.parseInt(p.value, 10)
  }
  const dayMinute = hour * 60 + minute
  return { hour, minute, dayMinute }
}

/** True if between 09:00 and 21:00 Riyadh (inclusive window for «9 ص — 9 م»). */
export function isRiyadhCallWindow(d: Date): boolean {
  const { dayMinute } = riyadhParts(d)
  const start = 9 * 60
  const end = 21 * 60
  return dayMinute >= start && dayMinute < end
}
