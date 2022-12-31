// * 格式化
import dayjs from "dayjs";

/**
 * @description 时间格式化
 */
export function format(
  date: Date | string,
  formatter: string = "YYYY-MM-DD HH:mm:ss"
) {
  return dayjs(date).format(formatter);
}
