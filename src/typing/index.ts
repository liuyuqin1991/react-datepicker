type MAP_KEY = number | string;

export type SelectionMode = 'year' | 'month' | 'week' | 'day' | 'quarter' | 'time';

export type TD = {
  style?: {[id: string]: boolean},
  label: number,
}

export type ParameterMap<T> = {
  [key in MAP_KEY]: T;
};