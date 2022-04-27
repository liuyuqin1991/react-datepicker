import React from 'react';
import { TimePickerMode } from 'Typing';
import 'Scss/picker.scss';
interface TimePickerProps {
    /**
     * 模式
     * @default time
     */
    selectionMode?: TimePickerMode;
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
