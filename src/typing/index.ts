type MAP_KEY = number | string;

export type DatePickerMode =
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'quarter'
  | 'daytime';

export type TimePickerMode = 'time';

export type TD = {
  style?: { [id: string]: boolean };
  label: number;
};

export type ParameterMap<T> = {
  [key in MAP_KEY]: T;
};

export type Time = {
  hour: number;
  minute: number;
  second: number;
};
