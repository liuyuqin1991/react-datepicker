import React from 'react';
import { SelectionMode } from '@typing';
import '@scss';
interface DatePickerProps {
    selectionMode?: SelectionMode;
    defaultDate?: Date | string;
    onPick: (date: Date[]) => void;
    format?: string;
    placeholder?: string;
    disabledDateFunc?: (date: Date) => boolean;
    className?: string;
    enableClear?: boolean;
}
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
