import React from 'react';
import {
  isFunction as _isFunction,
  toInteger as _toInteger,
  toString as _toString,
  times as _times,
  isEmpty as _isEmpty,
} from 'lodash';
import { Dayjs } from 'dayjs';
import classnames from 'classnames';

import { TD } from 'Typing';
import 'Scss/year-panel.scss';

interface YearPanelProps {
  defaultDate?: Dayjs,
  virtualDate?: Dayjs,
  onPick: (date: Dayjs[]) => void,
  disabledDateFunc?: (date: Dayjs) => void,
}

const YearPanel: React.FC<YearPanelProps> = (props) => {
  const { defaultDate, virtualDate, disabledDateFunc, onPick } = props;

  const onDatePick = (td: TD) => {
    const { label, style } = td;
    if (_isEmpty(td) || style.disabled) return;
    onPick([
      virtualDate.year(_toInteger(label)).startOf('year'),
      virtualDate.year(_toInteger(label)).endOf('year'),
    ]);
  };

  /**
   * 计算日历cell数据数组
   */
  const computeCellArray = (): TD[] => {
    const cell: TD[] = [];
    const preYear: number = _toInteger(virtualDate.year() / 10) ;
    _times(12).map((index: number) => {
      // 前缀为年份的前三位，后缀为年份的最后一位
      const currentYear: number = _toInteger(`${_toString(preYear)}${_toString(index)}`);
      const theYear: Dayjs = virtualDate.year(currentYear);
      const style = {
        'select': true,
        'pick':  currentYear === defaultDate.year(),
        'disabled': _isFunction(disabledDateFunc) && disabledDateFunc(theYear)
      };
      if(index < 10){
        cell.push({
          label: currentYear,
          style,
        }); 
      }
      else{
        cell.push({
          label: index,
          style: {'hide': true },
        }); 
      }
    });
    return cell;
  }

  /**
   * 渲染日历Tbody
   */
  const renderTbody = (): JSX.Element[] => {
    const trArray: JSX.Element[] = [];
    let tdArray: JSX.Element[] = [];
    const cellArray: TD[] = computeCellArray();
    cellArray.map((year: TD, index: number) => {
      tdArray.push(
        <td  key={`year-${year.label}`} className={classnames(year.style)} onClick={() => onDatePick(year)}>
          {year.label}
        </td>
      )
      if((index !== 0 && ( index + 1 ) % 4 === 0) || index === cellArray.length - 1){
        trArray.push(
          <tr key={`years-${index/4}`}>
            {tdArray}
          </tr>
        );
        tdArray = [];
      }
    });
    return trArray;
  }

  return (
    <table cellSpacing="0" cellPadding="0" className="year-table">
      <tbody>
        {renderTbody()}
      </tbody>
    </table>
  );
};

export default YearPanel;