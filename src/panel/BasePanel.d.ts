import React from 'react';
import { Dayjs } from 'dayjs';
import { SelectionMode } from 'Typing';
import 'Scss/base-panel.scss';
interface BasePanelProps {
    defaultDate?: Dayjs;
    onPick: (date: Dayjs[] | Dayjs) => void;
    onClose?: () => void;
    isShowTime?: boolean;
    showWeekNumber?: boolean;
    selectionMode: SelectionMode;
    disabledDateFunc?: (date: Date) => void;
    enableSecond?: boolean;
}
declare const BasePanel: React.FC<BasePanelProps>;
export default BasePanel;