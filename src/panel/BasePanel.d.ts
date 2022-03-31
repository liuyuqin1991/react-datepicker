import React from 'react';
import { Dayjs } from 'dayjs';
import { SelectionMode } from '@typing';
interface BasePanelProps {
    defaultDate?: Dayjs;
    onPick: (date: Dayjs[]) => void;
    isShowTime?: boolean;
    showWeekNumber?: boolean;
    selectionMode?: SelectionMode;
    disabledDateFunc?: (date: Date) => void;
}
declare const BasePanel: React.FC<BasePanelProps>;
export default BasePanel;
