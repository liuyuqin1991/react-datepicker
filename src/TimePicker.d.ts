import React from 'react';
import '@scss';
interface TimePickerProps {
    defaultTime?: Date | string;
    onPick: (date: Date) => void;
    format?: string;
    placeholder?: string;
    className?: string;
    enableSecond?: boolean;
}
declare const TimePicker: React.FC<TimePickerProps>;
export default TimePicker;
