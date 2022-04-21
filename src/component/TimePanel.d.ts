import React from 'react';
import { Dayjs } from 'dayjs';
import { Time } from 'Typing';
import 'rc-slider/assets/index.css';
import 'Scss/time-panel.scss';
interface TimePanelProps {
    defaultTime?: Time;
    onPick?: (time: Dayjs) => void;
    onClose?: () => void;
    onChange?: (time: Time) => void;
    enableSecond: boolean;
    showButton?: boolean;
}
declare const TimePanel: React.FC<TimePanelProps>;
export default TimePanel;
