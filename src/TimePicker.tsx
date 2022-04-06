import React, { useState, useRef } from 'react';
import { assign as _assign, isFunction as _isFunction } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import classnames from 'classnames';
import { usePopper } from 'react-popper';

import { useClickOutside } from '@hook';
import Input from '@src/input';
import BasePanel from '@src/panel/BasePanel';

import '@scss';

interface TimePickerProps {
  // v2.0参数
  defaultTime?: Date | string,
  onPick: (date: Date) => void,
  format?: string,
  placeholder?: string,
  className?: string;
  enableSecond?: boolean,
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const { className, format, defaultTime, placeholder, enableSecond = true, onPick } = props;
  const DEFAULT_FORMATS = enableSecond ? 'HH:mm:ss' : 'HH:mm';
  // state
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);
  const [time, setTime] = useState<Dayjs>(() => {
    return defaultTime ? dayjs(defaultTime) : dayjs().hour(0).minute(0).second(0);
  });
  const [text, setText] = useState<string>(() => {
    return defaultTime ? dayjs(defaultTime).format(format || DEFAULT_FORMATS) : '';
  });
  const timePickerRef = useRef<HTMLDivElement>(null);
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

  useClickOutside(timePickerRef, () => { setPickerVisible(false) });

  const onInputFocus = () => {
    if (!pickerVisible) {
      setPickerVisible(true);
    }
  }

  const onTimePick = (d: Dayjs) => {
    setTime(d);
    setText(d.format(format || DEFAULT_FORMATS));
    if(_isFunction(onPick)){
      onPick(d.toDate());
    }
    setPickerVisible(false);
  };

  const onClearText = () => {
    setText('');
    setTime(dayjs());
  }

  const closePanel = () => {
    setPickerVisible(false);
  };

  return (
    <div ref={timePickerRef}  className={classnames('timepicker-box', className)}>
      <div ref={setReferenceElement}>
        <Input 
          selectionMode="time"
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
            selectionMode="time"
            onPick={onTimePick}
            onClose={closePanel}
            defaultDate={time}
            enableSecond={enableSecond}
          />
        </div>
      }
    </div>
  ) 
};

export default TimePicker;
