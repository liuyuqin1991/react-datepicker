import React, { useState, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { SelectionMode } from 'Typing';
import DatePicker from 'Src/DatePicker';

import 'Scss/date-range-panel.scss';

interface DateRangePanelProps {
  selectionMode: SelectionMode,
  defaultDate?: Dayjs[],
  onPick: (date: Dayjs[]) => void,
  onClose: () => void,
  disabledDateFunc?: (date: Date) => boolean,
}

const DateRangePanel: React.FC<DateRangePanelProps> = (props) => {

  const { selectionMode, defaultDate, onPick, onClose, disabledDateFunc } = props;

  const [date, setDate] = useState<Dayjs[]>(defaultDate);

  const tempDatePick = (d: Date, index: number) => {
    if (index === 1) {
      setDate([date[0], dayjs(d)]);
    } else {
      setDate([dayjs(d), date[1]]);
    }
  };

  const datePick = () => {
    if (isBefore) return;
    onPick(date);
  }

  const isBefore = useMemo(() => date[1].isBefore(date[0]), [date]);

  return (
    <div className="daterange-panel">
      <div className="daterange-title">
        <span>请选择日期范围</span>
        <span className="icon-close" onClick={onClose}></span>
      </div>
      <div className="daterange-select-panel">
        <div>起始日期：</div>
        <DatePicker
          selectionMode={selectionMode}
          onPick={(d: Date[]) => tempDatePick(d[0], 0)}
          defaultDate={date[0].toDate()}
          disabledDateFunc={disabledDateFunc}
        />
      </div>
      <div className="daterange-select-panel">
        <div>结束日期：</div>
        <DatePicker
          selectionMode={selectionMode}
          onPick={(d: Date[]) => tempDatePick(d[1], 1)}
          defaultDate={date[1].toDate()}
          disabledDateFunc={disabledDateFunc}
        />
      </div>
      <div className="daterange-tip-panel">
        {isBefore && <span>结束日期早于起始日期，请重新选择</span>}
      </div>
      <div className="daterange-btn-panel">
        <div className="btn-cancel" onClick={onClose}>取消</div>
        <div className="btn-ok" onClick={datePick} style={isBefore ? { cursor: 'not-allowed' } : {cursor: 'pointer' }}>确定</div>
      </div>
    </div>
  );
};

export default DateRangePanel;