import React, { useMemo, useState } from 'react';
import {
  times as _times,
  set as _set,
} from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import 'Scss/time-panel.scss';

interface TimePanelProps {
  defaultTime?: Dayjs,
  onPick: (time: Dayjs) => void,
  onClose: () => void,
  enableSecond: boolean,
}

type Time = {
  hour: number;
  minute: number;
  second: number;
}


const addPrefixZero = (v: number): string => {
  return v < 10 ? `0${v}` : v.toString();
}

const TimePanel: React.FC<TimePanelProps> = (props) => {
  const { defaultTime, onPick, onClose, enableSecond } = props;
  const [time, setTime] = useState<Time>(() => {
    return {
      hour: defaultTime.hour(),
      minute: defaultTime.minute(),
      second: defaultTime.second(),
    };
  });

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

  const onTimeChange = (v: number, type: string) => {
    setTime({
      ...time,
      [type]: v,
    });
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
        onChange={(v: number) => onTimeChange(v, 'hour')}
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
        onChange={(v: number) => onTimeChange(v, 'minute')}
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
        onChange={(v: number) => onTimeChange(v, 'second')}
      />
    );
  }, [time]);

  return (
    <div className="time-panel">
      <div className="action-panel">
        <div className="hour-panel">
          <div className="input-panel">
            <input className="time-input" value={addPrefixZero(time.hour)} readOnly/>
          </div>
          <div className="slider-panel">
            {renderHourSlider}
          </div>
        </div>
        <div className="minute-panel">
          <div className="input-panel">
            <input className="time-input" value={addPrefixZero(time.minute)} readOnly/>
          </div>
          <div className="slider-panel">
            {renderMinuteSlider}
          </div>
        </div>
        {enableSecond && (
          <div className="second-panel">
            <div className="input-panel">
              <input className="time-input" value={addPrefixZero(time.second)} readOnly/>
            </div>
            <div className="slider-panel">
              {renderSecondSlider}
            </div>
          </div>
        )}
      </div>
      <div className="btn-panel">
        <div className="btn-cancel" onClick={handleClose}>取消</div>
        <div className="btn-ok" onClick={handlePick}>确定</div>
      </div>
    </div>
  );
};

export default TimePanel;