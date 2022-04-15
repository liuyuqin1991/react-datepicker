import React, { useState, useRef } from 'react';
import { assign as _assign, isFunction as _isFunction } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import classnames from 'classnames';
import { usePopper } from 'react-popper';

import { SelectionMode } from 'Typing';
import { DEFAULT_FORMATS_MAP } from 'Src/constants';
import { rangeDateToText } from 'Util';
import Input from 'Src/input';
import DateRangePanel from 'Src/panel/DateRangePanel';
import 'Scss/picker.scss';

interface DateRangePickerProps {
  // v3.0参数
  selectionMode?: SelectionMode,
  defaultDate?: Date[] | string[],
  onPick: (date: Date[]) => void,
  format?: string,
  placeholder?: string,
  disabledDateFunc?: (date: Date) => boolean,
  className?: string,
  enableClear?: boolean,
}

const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  const {
    className,
    selectionMode = 'day',
    onPick,
    format = DEFAULT_FORMATS_MAP[selectionMode],
    defaultDate,
    placeholder,
    enableClear = true,
    disabledDateFunc
  } = props;
  // state
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs[]>(() => {
    // 默认日期必须同时包含开始和结束日期
    if (defaultDate && defaultDate.length === 2) {
      return [dayjs(defaultDate[0]), dayjs(defaultDate[1])];
    }
    return [dayjs(), dayjs()];
  });
  const [text, setText] = useState<string>(defaultDate ? rangeDateToText(date, format) : '');
  const dateRangePickerRef = useRef<HTMLDivElement>(null);
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

  const onInputFocus = () => {
    if (!pickerVisible) {
      setPickerVisible(true);
    }
  }

  // 点击确定后的回调函数
  const datePick = (d: Dayjs[]) => {
    setDate(d);
    setText(rangeDateToText(d, format));
    if(_isFunction(onPick)){
      onPick([d[0].toDate(), d[1].toDate()]);
    }
    setPickerVisible(false);
  };

  const clearText = () => {
    setText('');
    setDate([dayjs(), dayjs()]);
  }

  const closePanel = () => {
    setPickerVisible(false);
  }

  return (
    <div ref={dateRangePickerRef}  className={classnames('daterangepicker-box', className)}>
      <div ref={setReferenceElement}>
        <Input 
          selectionMode={selectionMode}
          onFocus={onInputFocus}
          value={text}
          placeholder={placeholder}
          onIconClick={clearText}
          enableClear={enableClear}
        />
      </div>
      {
        pickerVisible && 
        <div ref={setPopperElement} style={_assign(styles.popper, { zIndex: 10 })} {...attributes.popper}>
          <DateRangePanel
            selectionMode={selectionMode}
            onPick={datePick}
            onClose={closePanel}
            defaultDate={date}
            disabledDateFunc={disabledDateFunc}
          />
        </div>
      }
    </div>
  ) 
};

export default DateRangePicker;

