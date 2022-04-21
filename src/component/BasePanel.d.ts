import React from 'react';
import { Dayjs } from 'dayjs';
import { SelectionMode } from 'Typing';
import 'Scss/base-panel.scss';
interface BasePanelProps {
    defaultDate?: Dayjs;
    onPick: (date: Dayjs[] | Dayjs) => void;
    onVirtualPick?: (date: Dayjs[] | Dayjs) => void;
    onClose?: () => void;
    selectionMode: SelectionMode;
    disabledDateFunc?: (date: Date) => boolean;
    enableSecond?: boolean;
    enableShowWeekNum?: boolean;
}
declare const BasePanel: React.FC<BasePanelProps>;
export default BasePanel;
