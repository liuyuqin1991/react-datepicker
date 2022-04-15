import React, { useState } from 'react';
import { includes as _includes, toInteger as _toInteger } from 'lodash';
import { Dayjs } from 'dayjs';

import { SelectionMode } from 'Typing';
import DayPanel from './DayPanel';
import MonthPanel from './MonthPanel';
import YearPanel from './YearPanel';
import TimePanel from './TimePanel';

import 'Scss/base-panel.scss';

interface BasePanelProps {
  defaultDate?: Dayjs,
  onPick: (date: Dayjs[] | Dayjs) => void,
  onClose?: () => void,
  isShowTime?: boolean,
  selectionMode: SelectionMode,
  disabledDateFunc?: (date: Date) => boolean,
  enableSecond?: boolean,
}

const BasePanel: React.FC<BasePanelProps> = (props) => {
  const { selectionMode, defaultDate, onPick, onClose, disabledDateFunc, enableSecond } = props;
  const [date, setDate] = useState<Dayjs>(defaultDate);
  const [currentPanel, setCurrentPanel] = useState<string>(() => {
    if (_includes(['day', 'week'], selectionMode)){
      return 'day';
    } else if (_includes(['month', 'quarter'], selectionMode)){
      return 'month';
    }
    return selectionMode;
  });

  const datePick = (d: Dayjs[]) => {
    // 日，周视图点击年视图进入时
    if (_includes(['day', 'week'], selectionMode) && currentPanel === 'year') {
      setDate(date.year(d[1].year()));
      setCurrentPanel('day');
    }
    // 日，周视图点击月视图进入时
    else if (_includes(['day', 'week'], selectionMode) && currentPanel === 'month') {
      setDate(date.month(d[1].month()));
      setCurrentPanel('day');
    }
    // 月，季视图点击年视图进入时
    else if (_includes(['month', 'quarter'], selectionMode) && currentPanel === 'year') {
      setDate(date.year(d[1].year()));
      setCurrentPanel('month');
    }
    else onPick(d);
  };

  const timePick = (d: Dayjs) => {
    onPick(d);
  }

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
          disabledDateFunc={disabledDateFunc}
        />
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
        defaultTime={defaultDate}
        onClose={closePanel}
        enableSecond={enableSecond}
      />
    );
  };

  const renderPanel = () => {
    if (currentPanel === 'day') {
      return renderDayPanel();
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