import { Dayjs } from 'dayjs';
export declare const getDefaultFormat: (selectionMode: string, enableSecond?: boolean) => string;
export declare const singleDateToText: (d: Dayjs, f: string) => string;
export declare const rangeDateToText: (d: Dayjs[], f: string) => string;
