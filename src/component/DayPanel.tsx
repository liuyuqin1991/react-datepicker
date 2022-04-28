import React from 'react';
import {
  isFunction as _isFunction,
  get as _get,
  times as _times,
} from 'lodash';
import { Dayjs } from 'dayjs';
import classnames from 'classnames';
import { DatePickerMode, TD } from 'Typing';
import { WEEK_CN_SHORT_ARRAY } from 'Src/constants';
import 'Scss/day-panel.scss';

interface DayPanelProps {
  selectionMode: DatePickerMode;
  // 虚拟日期，在对面板进行月加减，年加减和月，年切换时转化成的虚拟日期
  virtualDate?: Dayjs;
  // 默认日期，初始化和pick后的默认日期
  defaultDate?: Dayjs;
  enableShowWeekNum: boolean;
  onPick: (date: Dayjs[]) => void;
  disabledDateFunc?: (date: Date) => void;
}

const DayPanel: React.FC<DayPanelProps> = (props) => {
  const {
    selectionMode,
    defaultDate,
    virtualDate,
    enableShowWeekNum,
    disabledDateFunc,
    onPick,
  } = props;

  const onPickDay = (td: TD) => {
    const { label, style } = td;
    let newDate: Dayjs;
    if (_get(style, 'disabled')) return;
    if (_get(style, 'last')) {
      newDate = virtualDate.subtract(1, 'month').date(label);
    } else if (_get(style, 'next')) {
      newDate = virtualDate.add(1, 'month').date(label);
    } else {
      newDate = virtualDate.date(label);
    }
    onPick([newDate, newDate]);
  };

  const onPickWeek = (td: TD) => {
    const { label, style } = td;
    let startDate, endDate: Dayjs;
    if (_get(style, 'disabled')) return;
    if (_get(style, 'last')) {
      endDate = virtualDate.subtract(1, 'month').date(label);
      startDate = endDate.subtract(6, 'day');
    } else if (_get(style, 'next')) {
      endDate = virtualDate.add(1, 'month').date(label);
      startDate = endDate.subtract(6, 'day');
    } else {
      endDate = virtualDate.date(label);
      startDate = endDate.subtract(6, 'day');
    }
    onPick([startDate, endDate]);
  };

  const getWeekNum = (td: TD): number => {
    const { label, style } = td;
    if (_get(style, 'last')) {
      return virtualDate.subtract(1, 'month').date(label).week();
    } else if (_get(style, 'next')) {
      return virtualDate.add(1, 'month').date(label).week();
    } else return virtualDate.date(label).week();
  };

  /**
   * 计算日历cell数据数组
   * 说明：日历横7竖6，42个cell，若当月1号不在第1行第1列，前面用上月最后几天补齐，当月31号以后用下月前几天补齐
   */
  const computeCellArray = (): TD[] => {
    // 当前月份天数
    const daysInMonth: number = virtualDate.daysInMonth();
    // 当前月份天数计数器
    let currentMonthsDayCounter: number = new Number(daysInMonth).valueOf();
    // 下个月天数计数器
    let nextMonthsDayCounter = 1;
    // 上个月份天数
    const lastDaysInMonth = virtualDate.subtract(1, 'months').daysInMonth();
    // 当前月份1号的星期
    const currentDayWeek: number = virtualDate.date(1).day();
    // 当前月份1号星期计数器
    let currentDayWeekCounter: number = new Number(currentDayWeek).valueOf();
    // 数字数组
    const cell: TD[] = [];
    _times(42, (i: number) => {
      // 上个月数
      if (i < currentDayWeek) {
        const theDate: Dayjs = virtualDate
          .date(lastDaysInMonth + 1 - currentDayWeekCounter)
          .subtract(1, 'month');
        cell.push({
          label: lastDaysInMonth + 1 - currentDayWeekCounter,
          style: {
            last: true,
            disabled:
              _isFunction(disabledDateFunc) &&
              disabledDateFunc(theDate.toDate()),
          },
        });
        currentDayWeekCounter -= 1;
      }
      // 本月数
      else if (i < currentDayWeek + daysInMonth) {
        const currentDay: number = daysInMonth + 1 - currentMonthsDayCounter;
        const theDate: Dayjs = virtualDate.date(currentDay);
        if (
          virtualDate.date() === currentDay &&
          virtualDate.month() === defaultDate.month() &&
          virtualDate.year() === defaultDate.year()
        ) {
          cell.push({
            label: currentDay,
            style: {
              pick: true,
            },
          });
        } else {
          cell.push({
            label: currentDay,
            style: {
              disabled:
                _isFunction(disabledDateFunc) &&
                disabledDateFunc(theDate.toDate()),
            },
          });
        }
        currentMonthsDayCounter -= 1;
      }
      // 下个月
      else {
        const theDate: Dayjs = virtualDate
          .date(nextMonthsDayCounter)
          .add(1, 'month');
        cell.push({
          label: nextMonthsDayCounter,
          style: {
            next: true,
            disabled:
              _isFunction(disabledDateFunc) &&
              disabledDateFunc(theDate.toDate()),
          },
        });
        nextMonthsDayCounter += 1;
      }
    });
    return cell;
  };

  /**
   * 渲染日历Header
   */
  const renderHeader = (): JSX.Element => {
    return (
      <tr>
        {enableShowWeekNum && selectionMode === 'week' && (
          <th key="week-num-th" className="week-num-th"></th>
        )}
        {WEEK_CN_SHORT_ARRAY.map((week: string, index: number) => {
          return <th key={`${week}-${index}`}>{week}</th>;
        })}
      </tr>
    );
  };

  /**
   * 渲染日历Tbody
   */
  const renderTbody = (): JSX.Element[] => {
    const week: JSX.Element[] = [];
    let dayTemp: JSX.Element[] = [];
    let pickTrFlag = false;
    let disabledTrFlag = false;
    computeCellArray().map((day: TD, index: number) => {
      if (selectionMode === 'day' || selectionMode === 'daytime') {
        dayTemp.push(
          <td
            key={index}
            className={classnames(day.style)}
            onClick={() => onPickDay(day)}
          >
            {day.label}
          </td>
        );
        if (index !== 0 && (index + 1) % 7 === 0) {
          week.push(<tr key={`week-${index / 7}`}>{dayTemp}</tr>);
          dayTemp = [];
        }
      } else {
        dayTemp.push(
          <td key={index} className={classnames(day.style)}>
            {day.label}
          </td>
        );
        if (_get(day.style, 'pick')) {
          pickTrFlag = true;
        }
        if (_get(day.style, 'disabled')) {
          disabledTrFlag = true;
        }
        if (index !== 0 && (index + 1) % 7 === 0) {
          const cls = classnames({
            pick: pickTrFlag,
            disabled: disabledTrFlag,
          });
          if (enableShowWeekNum) {
            const weekNum = getWeekNum(day);
            dayTemp.unshift(
              <td key={`week-num-${weekNum}`} className="week-num-td">
                {weekNum}
              </td>
            );
          }
          week.push(
            <tr
              key={`week-${index / 7}`}
              className={cls}
              onClick={() => onPickWeek(day)}
            >
              {dayTemp}
            </tr>
          );
          dayTemp = [];
          pickTrFlag = false;
          disabledTrFlag = false;
        }
      }
    });
    return week;
  };

  return (
    <table
      cellSpacing="0"
      cellPadding="0"
      className={classnames('day-table', {
        'is-week-mode': selectionMode === 'week',
      })}
    >
      <thead>{renderHeader()}</thead>
      <tbody>{renderTbody()}</tbody>
    </table>
  );
};

export default DayPanel;
