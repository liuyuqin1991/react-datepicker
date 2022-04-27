declare type MAP_KEY = number | string;
export declare type DatePickerMode = 'year' | 'month' | 'week' | 'day' | 'quarter' | 'daytime';
export declare type TimePickerMode = 'time';
export declare type TD = {
    style?: {
        [id: string]: boolean;
    };
    label: number;
};
export declare type ParameterMap<T> = {
    [key in MAP_KEY]: T;
};
export declare type Time = {
    hour: number;
    minute: number;
    second: number;
};
export {};
