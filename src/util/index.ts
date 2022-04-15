import { Dayjs } from 'dayjs';

export const singleDateToText = (d: Dayjs, f: string): string => {
  if (d) {
    return d.format(f);
  }
  return '';
}

export const rangeDateToText = (d: Dayjs[], f: string): string => {
  if (d && d.length === 2) {
    return `${d[0].format(f)} 至 ${d[1].format(f)}`;
  }
  return '';
}

