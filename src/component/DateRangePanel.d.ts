import React from 'react';
import { Dayjs } from 'dayjs';
import { SelectionMode } from 'Typing';
import 'Scss/date-range-panel.scss';
interface DateRangePanelProps {
    selectionMode: SelectionMode;
    defaultDate: Dayjs[];
    format: string;
    titleLabel: string;
    contentLabel: string[];
    enableShowWeekNum: boolean;
    onPick: (date: Dayjs[]) => void;
    onClose: () => void;
    disabledDateFunc?: (date: Date) => boolean;
}
declare const DateRangePanel: React.FC<DateRangePanelProps>;
export default DateRangePanel;
