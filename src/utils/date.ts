/**
 * 将时间戳转换为格式化的日期时间字符串
 * @param timestamp 时间戳（秒）
 * @returns 格式化后的日期时间字符串 (YYYY-MM-DD HH:mm:ss)
 */
export function formatTimestamp(timestamp: string | number): string {
  if (!timestamp)
    return '-'
  const date = new Date(Number(timestamp) * 1000)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

/**
 * 日期字符串转时间戳（秒）
 * @param dateStr 形如 '2025-05-03' 或 '2025-05-03 12:00:00'
 * @returns 时间戳（秒）
 */
export function dateStrToTimestamp(dateStr: string): number {
  if (!dateStr)
    return 0
  // 兼容没有时分秒的情况
  const date = new Date(dateStr.replace(/-/g, '/'))
  return Math.floor(date.getTime() / 1000)
}
