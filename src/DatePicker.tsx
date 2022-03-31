import React, { useState, useRef } from 'react';
import { assign as _assign, isFunction as _isFunction } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import classnames from 'classnames';
import { usePopper } from 'react-popper';

import { SelectionMode } from '@typing';
import { useClickOutside } from '@hook';
import Input from '@src/input';
import BasePanel from '@src/panel/BasePanel';

import '@scss';


interface DatePickerProps {
    selectionMode?: SelectionMode,
    defaultDate?: Date | string,
    onPick: (date: Date[]) => void,
    format?: string,
    placeholder?: string,
    disabledDateFunc?: (date: Date) => void,
    className?: string;
}

const DEFAULT_FORMATS_MAP = {
  day: 'YYYY-MM-DD',
  month: 'YYYY-M',
  year: 'YYYY',
  week: 'YYYY-w',
  quarter: 'YYYY-Q',
};

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { className, selectionMode = 'day', onPick, format, defaultDate, placeholder, disabledDateFunc } = props;
  // state
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs>(dayjs(defaultDate));
  const [text, setText] = useState<string>(() => {
    return defaultDate ? dayjs(defaultDate).format(format || DEFAULT_FORMATS_MAP[selectionMode]) : '';
  });
  const datePickerRef = useRef<HTMLDivElement>(null);
  // popper相关
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ 
      name: 'preventOverflow',
      options: { padding: 8 } 
    }],
  });
  // 扩展dayjs的功能
  dayjs.extend(advancedFormat);
  dayjs.extend(weekOfYear);

  useClickOutside(datePickerRef, () => { setPickerVisible(false) });

  const onInputFocus = () => {
    if (!pickerVisible) {
      setPickerVisible(true);
    }
  }

  const onDatePick = (d: Dayjs[]) => {
    setDate(d[1]);
    setText(d[1].format(format || DEFAULT_FORMATS_MAP[selectionMode]));
    if(_isFunction(onPick)){
      onPick([d[0].toDate(), d[1].toDate()]);
    }
    setPickerVisible(false);
  };

  const onClearText = () => {
    setText('');
    setDate(dayjs());
  }

  return (
    <div ref={datePickerRef}  className={classnames('datepicker-box', className)}>
      <div ref={setReferenceElement}>
        <Input 
          selectionMode={selectionMode}
          onFocus={onInputFocus}
          value={text}
          placeholder={placeholder}
          onIconClick={onClearText}
        />
      </div>
      {
        pickerVisible && 
        <div ref={setPopperElement} style={_assign(styles.popper, { zIndex: 10 })} {...attributes.popper}>
          <BasePanel
            selectionMode={selectionMode}
            onPick={onDatePick}
            defaultDate={date}
            disabledDateFunc={disabledDateFunc}
          />
        </div>
      }
    </div>
  ) 
};

export default DatePicker;

