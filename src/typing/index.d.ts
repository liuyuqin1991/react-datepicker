declare type MAP_KEY = number | string;
export declare type SelectionMode = 'year' | 'month' | 'week' | 'day' | 'quarter' | 'time';
export declare type TD = {
    style?: {
        [id: string]: boolean;
    };
    label: number;
};
export declare type ParameterMap<T> = {
    [key in MAP_KEY]: T;
};
export {};
