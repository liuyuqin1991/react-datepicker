import React from 'react';
import { Dayjs } from 'dayjs';
import { DatePickerMode } from 'Typing';
import 'Scss/day-panel.scss';
interface DayPanelProps {
    selectionMode: DatePickerMode;
    virtualDate?: Dayjs;
    defaultDate?: Dayjs;
    enableShowWeekNum: boolean;
    onPick: (date: Dayjs[]) => void;
    disabledDateFunc?: (date: Date) => void;
}
declare const DayPanel: React.FC<DayPanelProps>;
export default DayPanel;
