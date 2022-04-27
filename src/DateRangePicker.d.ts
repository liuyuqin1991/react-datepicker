import React from 'react';
import { DatePickerMode } from 'Typing';
import 'Scss/picker.scss';
interface DateRangePickerProps {
    selectionMode?: DatePickerMode;
    defaultDate?: Date[] | string[];
    onPick: (date: Date[]) => void;
    format?: string;
    placeholder?: string;
    disabledDateFunc?: (date: Date) => boolean;
    className?: string;
    enableClear?: boolean;
    enableShowWeekNum?: boolean;
    titleLabel?: string;
    contentLabel?: string[];
}
declare const DateRangePicker: React.FC<DateRangePickerProps>;
export default DateRangePicker;
