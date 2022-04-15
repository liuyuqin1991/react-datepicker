import React from 'react';
import { SelectionMode } from 'Typing';
import 'Scss/picker.scss';
interface DateRangePickerProps {
    selectionMode?: SelectionMode;
    defaultDate?: Date[] | string[];
    onPick: (date: Date[]) => void;
    format?: string;
    placeholder?: string;
    disabledDateFunc?: (date: Date) => boolean;
    className?: string;
    enableClear?: boolean;
}
declare const DateRangePicker: React.FC<DateRangePickerProps>;
export default DateRangePicker;
