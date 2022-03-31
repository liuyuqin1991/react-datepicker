import React, { useState } from 'react';
import { includes as _includes, toInteger as _toInteger, isFunction as _isFunction } from 'lodash';
import { Dayjs } from 'dayjs';

import { SelectionMode } from '@typing';
import DayPanel from './DayPanel';
import MonthPanel from './MonthPanel';
import YearPanel from './YearPanel';

interface BasePanelProps {
  defaultDate?: Dayjs,
  onPick: (date: Dayjs[]) => void,
  isShowTime?: boolean,
  showWeekNumber?: boolean,
  selectionMode?: SelectionMode,
  disabledDateFunc?: (date: Date) => void,
}

const BasePanel: React.FC<BasePanelProps> = (props) => {
  const { selectionMode, defaultDate, onPick, disabledDateFunc } = props;
  const [date, setDate] = useState<Dayjs>(defaultDate);
  const [currentPanel, setCurrentPanel] = useState<string>(() => {
    if(_includes(['day', 'week'], selectionMode)){
      return 'day';
    }
    else if(_includes(['month', 'quarter'], selectionMode)){
      return 'month';
    }
    return 'year';
  });

  const onDatePick = (d: Dayjs[]) => {
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
    else if(_isFunction(onPick)) {
      onPick(d);
    }
  };

  const onClickLast = (type: string, count: number) => {
    setDate(date.subtract(count, type));
  };

  const onClickNext = (type: string, count: number) => {
    setDate(date.add(count, type));
  };

  const onClickShowPanel = (evt: React.BaseSyntheticEvent, type: string) => {
    setCurrentPanel(type);
  };

  const renderPanel = () => {
    if (currentPanel === 'day') {
      return (
        <>
          <div className="header">
            <button
              type="button"
              onClick={() => onClickLast('year',1)}
              className="icon-btn icon-double-left">
            </button>
            <button
              type="button"
              onClick={() => onClickLast('month',1)}
              className="icon-btn icon-left">
            </button>
            <div className="date-label">
              <div className="year" onClick={(e: React.BaseSyntheticEvent) => onClickShowPanel(e, 'year')}>
                {`${date.year()} 年 `}
              </div>
              <div className="month" onClick={(e: React.BaseSyntheticEvent) => onClickShowPanel(e, 'month')}>
                {`${date.month() + 1} 月 `}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onClickNext('month',1)}
              className="icon-btn icon-right">
            </button>
            <button
              type="button"
              onClick={() => onClickNext('year',1)}
              className="icon-btn icon-double-right">
            </button>
          </div>
          <DayPanel 
            onPick={onDatePick}
            defaultDate={defaultDate}
            virtualDate={date}
            selectionMode={selectionMode}
            disabledDateFunc={disabledDateFunc}
          />
        </>
      )
    } else if (currentPanel === 'month') {
      return (
        <>
          <div className="header">
            <button
              type="button"
              onClick={() => onClickLast('year',1)}
              className="icon-btn icon-double-left">
            </button>
            <div className="date-label">
              <div className="month" onClick={(e: React.BaseSyntheticEvent) => onClickShowPanel(e, 'year')}>
                {`${date.year()} 年 `}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onClickNext('year',1)}
              className="icon-btn icon-double-right">
            </button>
          </div>
          <MonthPanel
            onPick={onDatePick}
            defaultDate={defaultDate}
            virtualDate={date}
            selectionMode={selectionMode}
          />
        </>
      )
    } else {
      return (
        <>
          <div className="header">
            <button
              type="button"
              onClick={() => onClickLast('year',10)}
              className="icon-btn icon-double-left">
            </button>
            <div className="date-label">
              <div className="year disabled">
                {`${_toInteger(date.year() / 10)}0年 - ${_toInteger(date.year() / 10)}9年`}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onClickNext('year',10)}
              className="icon-btn icon-double-right">
            </button>
          </div>
          <YearPanel
            onPick={onDatePick}
            defaultDate={defaultDate}
            date={date}
          />
        </>
      )
    }
  };

  return (
    <div className="picker-panel">
      {renderPanel()}
    </div>
  );
};

export default BasePanel;