import React from 'react';
import {
  isFunction as _isFunction,
  get as _get,
  includes as _includes,
  times as _times,
} from 'lodash';
import { Dayjs } from 'dayjs';
import classnames from 'classnames';

import { SelectionMode, TD } from 'Typing';
import 'Scss/month-panel.scss';

interface MonthPanelProps {
  selectionMode: SelectionMode;
  defaultDate?: Dayjs;
  virtualDate?: Dayjs;
  onPick: (date: Dayjs[]) => void;
  disabledDateFunc?: (date: Dayjs) => void;
}

const MonthPanel: React.FC<MonthPanelProps> = (props) => {
  const { selectionMode, defaultDate, virtualDate, disabledDateFunc, onPick } =
    props;

  const onDatePick = (td: TD, type: string) => {
    const { label, style } = td;
    if (_get(style, 'disabled')) return;
    if (type === 'month') {
      onPick([
        virtualDate.month(label - 1).startOf('month'),
        virtualDate.month(label - 1).endOf('month'),
      ]);
    } else {
      onPick([
        virtualDate.month(label - 3).startOf('month'),
        virtualDate.month(label - 1).endOf('month'),
      ]);
    }
  };

  /**
   * 计算日历cell数据数组
   */
  const computeCellArray = (): Array<TD> => {
    // 数字数组
    const cell: TD[] = [];
    _times(12, (month: number) => {
      const theMonth: Dayjs = virtualDate.month(month);
      const style = {
        select: true,
        pick:
          month === defaultDate.month() &&
          virtualDate.year() === defaultDate.year(),
        disabled: _isFunction(disabledDateFunc) && disabledDateFunc(theMonth),
      };
      cell.push({
        label: month + 1,
        style: style,
      });
    });
    return cell;
  };

  /**
   * 渲染日历Tbody
   */
  const renderTbody = (): JSX.Element[] => {
    const quarter: JSX.Element[] = [];
    let arrTemp: JSX.Element[] = [];
    let pickTrFlag = false;
    let disabledTrFlag = false;
    computeCellArray().map((month: TD, index: number) => {
      // 月视图，日视图转月视图，周视图转月视图
      if (_includes(['day', 'daytime', 'week', 'month'], selectionMode)) {
        arrTemp.push(
          <td
            key={`month-${month.label}`}
            className={classnames(month.style)}
            onClick={() => onDatePick(month, selectionMode)}
          >
            {month.label + '月'}
          </td>
        );
        if (index !== 0 && (index + 1) % 3 === 0) {
          quarter.push(<tr key={`quarter-${index / 3}`}>{arrTemp}</tr>);
          arrTemp = [];
        }
      } else {
        arrTemp.push(
          <td key={`month-${month.label}`} className={classnames(month.style)}>
            {month.label + '月'}
          </td>
        );
        if (month.style.pick) {
          pickTrFlag = true;
        }
        if (month.style.disabled) {
          disabledTrFlag = true;
        }
        if (index !== 0 && (index + 1) % 3 === 0) {
          const cls = {
            pick: pickTrFlag,
            disabled: disabledTrFlag,
          };
          quarter.push(
            <tr
              key={`quarter-${index / 3}`}
              className={classnames(cls)}
              onClick={() => onDatePick(month, selectionMode)}
            >
              {arrTemp}
            </tr>
          );
          arrTemp = [];
          pickTrFlag = false;
          disabledTrFlag = false;
        }
      }
    });
    return quarter;
  };

  return (
    <table
      cellSpacing="0"
      cellPadding="0"
      className={classnames('month-table', {
        'is-quarter-mode': selectionMode === 'quarter',
      })}
    >
      <tbody>{renderTbody()}</tbody>
    </table>
  );
};

export default MonthPanel;
