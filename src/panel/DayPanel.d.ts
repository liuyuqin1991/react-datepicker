import React from 'react';
import { Dayjs } from 'dayjs';
import { SelectionMode } from '@typing';
interface DayPanelProps {
    selectionMode: SelectionMode;
    virtualDate?: Dayjs;
    defaultDate?: Dayjs;
    onPick: (date: Dayjs[]) => void;
    disabledDateFunc?: (date: Date) => void;
}
declare const DayPanel: React.FC<DayPanelProps>;
export default DayPanel;
