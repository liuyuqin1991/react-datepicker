import React from 'react';
import { Dayjs } from 'dayjs';
import { SelectionMode } from 'Typing';
import 'Scss/month-panel.scss';
interface MonthPanelProps {
    selectionMode: SelectionMode;
    defaultDate?: Dayjs;
    virtualDate?: Dayjs;
    onPick: (date: Dayjs[]) => void;
    disabledDateFunc?: (date: Dayjs) => void;
}
declare const MonthPanel: React.FC<MonthPanelProps>;
export default MonthPanel;
