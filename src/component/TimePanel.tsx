import React, { useMemo, useState } from 'react';
import {
  times as _times,
  set as _set,
  isFunction as _isFunction,
} from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import Slider from 'rc-slider';

import { ActionButton } from 'Component';
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

const addPrefixZero = (v: number): string => {
  return v < 10 ? `0${v}` : v.toString();
};

const TimePanel: React.FC<TimePanelProps> = (props) => {
  const {
    defaultTime,
    onPick,
    onClose,
    onChange,
    enableSecond,
    showButton = true,
  } = props;
  const [time, setTime] = useState<Time>(defaultTime);

  const handlePick = () => {
    onPick(dayjs().hour(time.hour).minute(time.minute).second(time.second));
  };

  const handleClose = () => {
    onClose();
  };

  const hourMarks = {};
  _times(8, (i: number) => {
    _set(hourMarks, i * 3, addPrefixZero(i * 3));
    if (i === 7) {
      _set(hourMarks, 23, addPrefixZero(23));
    }
  });

  const minuteMarks = {};
  _times(6, (i: number) => {
    _set(minuteMarks, i * 10, addPrefixZero(i * 10));
    if (i === 5) {
      _set(minuteMarks, 59, addPrefixZero(59));
    }
  });

  const timeChange = (v: number, type: string) => {
    const current: Time = {
      ...time,
      [type]: v,
    };
    setTime(current);
    if (_isFunction(onChange)) {
      onChange(current);
    }
  };

  const renderHourSlider = useMemo(() => {
    return (
      <Slider
        vertical
        min={0}
        max={23}
        step={1}
        marks={hourMarks}
        defaultValue={time.hour}
        onChange={(v: number) => timeChange(v, 'hour')}
      />
    );
  }, [time]);

  const renderMinuteSlider = useMemo(() => {
    return (
      <Slider
        vertical
        min={0}
        max={59}
        step={1}
        marks={minuteMarks}
        defaultValue={time.minute}
        onChange={(v: number) => timeChange(v, 'minute')}
      />
    );
  }, [time]);

  const renderSecondSlider = useMemo(() => {
    return (
      <Slider
        vertical
        min={0}
        max={59}
        step={1}
        marks={minuteMarks}
        defaultValue={time.second}
        onChange={(v: number) => timeChange(v, 'second')}
      />
    );
  }, [time]);

  return (
    <div className="time-panel">
      <div className="action-panel">
        <div className="hour-panel">
          <div className="input-panel">
            <input
              className="time-input"
              value={addPrefixZero(time.hour)}
              readOnly
            />
          </div>
          <div className="slider-panel">{renderHourSlider}</div>
        </div>
        <div className="minute-panel">
          <div className="input-panel">
            <input
              className="time-input"
              value={addPrefixZero(time.minute)}
              readOnly
            />
          </div>
          <div className="slider-panel">{renderMinuteSlider}</div>
        </div>
        {enableSecond && (
          <div className="second-panel">
            <div className="input-panel">
              <input
                className="time-input"
                value={addPrefixZero(time.second)}
                readOnly
              />
            </div>
            <div className="slider-panel">{renderSecondSlider}</div>
          </div>
        )}
      </div>
      {showButton && <ActionButton onOk={handlePick} onClose={handleClose} />}
    </div>
  );
};

export default TimePanel;
