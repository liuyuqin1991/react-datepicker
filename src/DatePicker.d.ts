import React from 'react';
import { DatePickerMode } from 'Typing';
import 'Scss/picker.scss';
export interface DatePickerProps {
    /**
     * 模式
     * @default day
     */
    selectionMode?: DatePickerMode;
    /**
     * 初始日期
     */
    defaultDate?: Date | string;
    /**
     * 点击日期回调
     * @default () => {}
     */
    onPick?: (date: Date[]) => void;
    /**
     * 格式化（符合dayjs风格的format）
     */
    format?: string;
    /**
     * 占位符
     */
    placeholder?: string;
    /**
     * 禁用日期回调
     */
    disabledDateFunc?: (date: Date) => boolean;
    /**
     * 样式名称
     */
    className?: string;
    /**
     * 是否开启日期清除
     * @default true
     */
    enableClear?: boolean;
    /**
     * 是否开启周数显示
     * @default true
     */
    enableShowWeekNum?: boolean;
    /**
     * 是否显示秒
     * @default false
     */
    enableSecond?: boolean;
}
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
