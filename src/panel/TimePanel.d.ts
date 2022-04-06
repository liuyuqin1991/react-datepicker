import React from 'react';
import { Dayjs } from 'dayjs';
import 'rc-slider/assets/index.css';
import '@scss/time-panel.scss';
interface TimePanelProps {
    defaultTime?: Dayjs;
    onPick: (time: Dayjs) => void;
    onClose: () => void;
    enableSecond: boolean;
}
declare const TimePanel: React.FC<TimePanelProps>;
export default TimePanel;
