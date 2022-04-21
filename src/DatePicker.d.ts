import React from 'react';
import { SelectionMode } from 'Typing';
import 'Scss/picker.scss';
interface DatePickerProps {
    selectionMode?: SelectionMode;
    defaultDate?: Date | string;
    onPick: (date: Date[]) => void;
    format?: string;
    placeholder?: string;
    disabledDateFunc?: (date: Date) => boolean;
    className?: string;
    enableClear?: boolean;
    enableShowWeekNum?: boolean;
    enableSecond?: boolean;
}
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
