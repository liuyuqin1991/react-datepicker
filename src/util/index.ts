import { Dayjs } from 'dayjs';
import { DEFAULT_FORMATS_MAP } from 'Src/constants';

export const getDefaultFormat = (
  selectionMode: string,
  enableSecond = false
): string => {
  return `${DEFAULT_FORMATS_MAP[selectionMode]}${
    enableSecond && (selectionMode === 'daytime' || selectionMode === 'time')
      ? ':ss'
      : ''
  }`;
};

export const singleDateToText = (d: Dayjs, f: string): string => {
  if (!d) return '';
  return d.format(f);
};

export const rangeDateToText = (d: Dayjs[], f: string): string => {
  if (d && d.length === 2) {
    return `${d[0].format(f)} 至 ${d[1].format(f)}`;
  }
  return '';
};
