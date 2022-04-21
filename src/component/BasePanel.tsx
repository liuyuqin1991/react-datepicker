import React, { useMemo, useState } from 'react';
import { includes as _includes, toInteger as _toInteger } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

import { SelectionMode } from 'Typing';
import { ActionButton } from 'Component';
import DayPanel from './DayPanel';
import MonthPanel from './MonthPanel';
import YearPanel from './YearPanel';
import TimePanel from './TimePanel';

import 'Scss/base-panel.scss';

interface BasePanelProps {
  defaultDate?: Dayjs,
  onPick: (date: Dayjs[] | Dayjs) => void,
  onClose?: () => void,
  selectionMode: SelectionMode,
  disabledDateFunc?: (date: Date) => boolean,
  enableSecond?: boolean,
  enableShowWeekNum?: boolean,
}

type Time = {
  hour: number;
  minute: number;
  second: number;
}

const BasePanel: React.FC<BasePanelProps> = (props) => {
  const {
    selectionMode,
    defaultDate,
    onPick,
    onClose,
    disabledDateFunc,
    enableSecond,
    enableShowWeekNum,
  } = props;
  const [date, setDate] = useState<Dayjs>(defaultDate);
  const [time, setTime] = useState<Time>(() => {
    return {
      hour: defaultDate.hour(),
      minute: defaultDate.minute(),
      second: defaultDate.second(),
    };
  });
  const [currentPanel, setCurrentPanel] = useState<string>(() => {
    if (_includes(['day', 'week', 'daytime'], selectionMode)){
      return 'day';
    } else if (_includes(['month', 'quarter'], selectionMode)){
      return 'month';
    }
    return selectionMode;
  });

  const datePick = (d: Dayjs[]) => {
    // 日，周视图点击年视图进入时
    if (_includes(['day', 'week', 'daytime'], selectionMode) && currentPanel === 'year') {
      setDate(date.year(d[1].year()));
      setCurrentPanel('day');
    }
    // 日，周视图点击月视图进入时
    else if (_includes(['day', 'week', 'daytime'], selectionMode) && currentPanel === 'month') {
      setDate(date.month(d[1].month()));
      setCurrentPanel('day');
    }
    // 月，季视图点击年视图进入时
    else if (_includes(['month', 'quarter'], selectionMode) && currentPanel === 'year') {
      setDate(date.year(d[1].year()));
      setCurrentPanel('month');
    }
    // 日视图且开启时间选择时
    else if (selectionMode === 'daytime') {
      setDate(d[1]);
    } else {
      onPick(d);
    }
  };

  const timePick = (d: Dayjs) => {
    onPick(d);
  };

  const dateTimePick = () => {
    const d = dayjs(date).hour(time.hour).minute(time.minute).second(time.second);
    onPick([d, d]);
  };

  const timeChange = (t: Time) => {
    setTime(t);
  };

  const last = (type: string, count: number) => {
    setDate(date.subtract(count, type));
  };

  const next = (type: string, count: number) => {
    setDate(date.add(count, type));
  };

  const showPanel = (evt: React.BaseSyntheticEvent, type: string) => {
    setCurrentPanel(type);
  };

  const closePanel = () => {
    onClose();
  }

  const renderDayPanel = () => {
    return (
      <>
        <div className="header">
          <button
            type="button"
            onClick={() => last('year',1)}
            className="icon-btn icon-double-left">
          </button>
          <button
            type="button"
            onClick={() => last('month',1)}
            className="icon-btn icon-left">
          </button>
          <div className="date-label">
            <div className="year" onClick={(e: React.BaseSyntheticEvent) => showPanel(e, 'year')}>
              {`${date.year()} 年 `}
            </div>
            <div className="month" onClick={(e: React.BaseSyntheticEvent) => showPanel(e, 'month')}>
              {`${date.month() + 1} 月 `}
            </div>
          </div>
          <button
            type="button"
            onClick={() => next('month',1)}
            className="icon-btn icon-right">
          </button>
          <button
            type="button"
            onClick={() => next('year',1)}
            className="icon-btn icon-double-right">
          </button>
        </div>
        <DayPanel
          onPick={datePick}
          defaultDate={defaultDate}
          virtualDate={date}
          selectionMode={selectionMode}
          enableShowWeekNum={enableShowWeekNum}
          disabledDateFunc={disabledDateFunc}
        />
      </>
    );
  };

  const renderTimePicker = useMemo(() => {
    return (
      <div className="date-time-panel">
        <TimePanel
          defaultTime={time}
          enableSecond={enableSecond}
          showButton={false}
          onChange={timeChange}
        />
      </div>
    );
  }, [time]);

  const renderDayTimePanel = () => {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <div className="header">
              <button
                type="button"
                onClick={() => last('year',1)}
                className="icon-btn icon-double-left">
              </button>
              <button
                type="button"
                onClick={() => last('month',1)}
                className="icon-btn icon-left">
              </button>
              <div className="date-label">
                <div className="year" onClick={(e: React.BaseSyntheticEvent) => showPanel(e, 'year')}>
                  {`${date.year()} 年 `}
                </div>
                <div className="month" onClick={(e: React.BaseSyntheticEvent) => showPanel(e, 'month')}>
                  {`${date.month() + 1} 月 `}
                </div>
              </div>
              <button
                type="button"
                onClick={() => next('month',1)}
                className="icon-btn icon-right">
              </button>
              <button
                type="button"
                onClick={() => next('year',1)}
                className="icon-btn icon-double-right">
              </button>
            </div>
            <DayPanel
              onPick={datePick}
              defaultDate={date}
              virtualDate={date}
              selectionMode={selectionMode}
              enableShowWeekNum={enableShowWeekNum}
              disabledDateFunc={disabledDateFunc}
            />
          </div>
          {renderTimePicker}
        </div>
        <ActionButton onOk={dateTimePick} onClose={closePanel} />
      </>
    );
  };

  const renderMonthPanel = () => {
    return (
      <>
        <div className="header">
          <button
            type="button"
            onClick={() => last('year',1)}
            className="icon-btn icon-double-left">
          </button>
          <div className="date-label">
            <div className="month" onClick={(e: React.BaseSyntheticEvent) => showPanel(e, 'year')}>
              {`${date.year()} 年 `}
            </div>
          </div>
          <button
            type="button"
            onClick={() => next('year',1)}
            className="icon-btn icon-double-right">
          </button>
        </div>
        <MonthPanel
          onPick={datePick}
          defaultDate={defaultDate}
          virtualDate={date}
          selectionMode={selectionMode}
        />
      </>
    );
  };

  const renderYearPanel = () => {
    return (
      <>
        <div className="header">
          <button
            type="button"
            onClick={() => last('year',10)}
            className="icon-btn icon-double-left">
          </button>
          <div className="date-label">
            <div className="year disabled">
              {`${_toInteger(date.year() / 10)}0年 - ${_toInteger(date.year() / 10)}9年`}
            </div>
          </div>
          <button
            type="button"
            onClick={() => next('year',10)}
            className="icon-btn icon-double-right">
          </button>
        </div>
        <YearPanel
          onPick={datePick}
          defaultDate={defaultDate}
          virtualDate={date}
        />
      </>
    );
  };

  const renderTimePanel = () => {
    return (
      <TimePanel
        onPick={timePick}
        defaultTime={time}
        onClose={closePanel}
        enableSecond={enableSecond}
      />
    );
  };

  const renderPanel = () => {
    if (currentPanel === 'day') {
      return selectionMode === 'daytime' ? renderDayTimePanel() : renderDayPanel();
    } else if (currentPanel === 'month') {
      return renderMonthPanel();
    } else if (currentPanel === 'year') {
      return renderYearPanel();
    } else return renderTimePanel();
  };

  return (
    <div className="picker-panel">
      {renderPanel()}
    </div>
  );
};

export default BasePanel;