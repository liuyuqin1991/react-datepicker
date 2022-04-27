import React from 'react';
import { DatePickerMode, TimePickerMode } from 'Typing';
import 'Scss/input.scss';
interface InputProps {
    inputClassName?: string;
    placeholder?: string;
    value?: string;
    onFocus?(e?: React.ChangeEvent<HTMLInputElement>): void;
    onBlur?(e?: React.ChangeEvent<HTMLInputElement>): void;
    onIconClick?(e?: React.MouseEvent): void;
    selectionMode: DatePickerMode | TimePickerMode;
    enableClear: boolean;
}
declare const Input: React.FC<InputProps>;
export default Input;
