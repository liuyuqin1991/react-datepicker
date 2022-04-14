import React from 'react';
import 'Scss/picker.scss';
interface TimePickerProps {
    defaultTime?: Date | string;
    onPick: (date: Date) => void;
    format?: string;
    placeholder?: string;
    className?: string;
    enableSecond?: boolean;
    enableClear?: boolean;
}
declare const TimePicker: React.FC<TimePickerProps>;
export default TimePicker;
