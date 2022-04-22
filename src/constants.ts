import { ParameterMap } from 'Typing';

export const DEFAULT_FORMATS_MAP: ParameterMap<string> = {
  day: 'YYYY-MM-DD',
  month: 'YYYY-M',
  year: 'YYYY',
  week: 'YYYY-w',
  quarter: 'YYYY-Q',
  time: 'HH:mm',
  daytime: 'YYYY-MM-DD HH:mm',
};

export const DEFAULT_PLACEHOLDER_MAP: ParameterMap<string> = {
  day: '请选择日期',
  daytime: '请选择日期',
  week: '请选择周',
  month: '请选择月',
  quarter: '请选择季',
  year: '请选择年',
  time: '请选择时间',
  'date-range': '请选择日期范围',
  'time-range': '请选择时间范围',
};

export const WEEK_CN_SHORT_ARRAY: string[] = [
  '日',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
];
