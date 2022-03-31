import React from 'react';
import { SelectionMode } from '@typing';
import './index.scss';
interface InputProps {
    inputClassName?: string;
    placeholder?: string;
    value?: string;
    onFocus?(e?: React.ChangeEvent<HTMLInputElement>): void;
    onBlur?(e?: React.ChangeEvent<HTMLInputElement>): void;
    onIconClick?(e?: React.MouseEvent): void;
    selectionMode: SelectionMode;
}
declare const Input: React.FC<InputProps>;
export default Input;
