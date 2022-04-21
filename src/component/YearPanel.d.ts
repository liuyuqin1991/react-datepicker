import React from 'react';
import { Dayjs } from 'dayjs';
import 'Scss/year-panel.scss';
interface YearPanelProps {
    defaultDate?: Dayjs;
    virtualDate?: Dayjs;
    onPick: (date: Dayjs[]) => void;
    disabledDateFunc?: (date: Dayjs) => void;
}
declare const YearPanel: React.FC<YearPanelProps>;
export default YearPanel;
