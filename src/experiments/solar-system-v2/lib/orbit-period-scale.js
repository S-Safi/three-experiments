// 1 yr = 10 mins

export default function orbitPeriodScale(periodDays) {
  return periodDays / (365 * 24 * 6);
}
