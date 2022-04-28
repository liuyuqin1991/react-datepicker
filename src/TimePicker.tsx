import React, { useState, useRef } from 'react';
import { assign as _assign, isFunction as _isFunction } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import classnames from 'classnames';
import { usePopper } from 'react-popper';

import { TimePickerMode } from 'Typing';
import { useClickOutside } from 'Hook';
import { Input, BasePanel } from 'Component';
import { singleDateToText, getDefaultFormat } from 'Util';
import 'Scss/picker.scss';

interface TimePickerProps {
  /**
   * 模式
   * @default time
   */
  selectionMode?: TimePickerMode;
  /**
   * 初始时间
   */
  defaultTime?: Date | string;
  /**
   * 点击时间回调
   * @default () => {}
   */
  onPick: (date: Date) => void;
  /**
   * 格式化（符合dayjs风格的format）
   */
  format?: string;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 样式名称
   */
  className?: string;
  /**
   * 是否显示秒
   * @default false
   */
  enableSecond?: boolean;
  /**
   * 是否开启时间清除
   * @default true
   */
  enableClear?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const {
    selectionMode = 'time',
    className,
    defaultTime,
    placeholder,
    enableSecond = false,
    enableClear = true,
    format = getDefaultFormat('time', enableSecond),
    onPick,
  } = props;
  // state
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);
  const [time, setTime] = useState<Dayjs>(() => {
    return defaultTime
      ? dayjs(defaultTime)
      : dayjs().hour(0).minute(0).second(0);
  });
  const [text, setText] = useState<string>(() => {
    return defaultTime ? singleDateToText(time, format) : '';
  });
  const timePickerRef = useRef<HTMLDivElement>(null);
  // popper相关
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'preventOverflow',
        options: { padding: 8 },
      },
    ],
  });

  useClickOutside(timePickerRef, () => {
    setPickerVisible(false);
  });

  const onInputFocus = () => {
    if (!pickerVisible) {
      setPickerVisible(true);
    }
  };

  const onTimePick = (d: Dayjs) => {
    setTime(d);
    setText(singleDateToText(d, format));
    if (_isFunction(onPick)) {
      onPick(d.toDate());
    }
    setPickerVisible(false);
  };

  const onClearText = () => {
    setText('');
    setTime(dayjs().hour(0).minute(0).second(0));
  };

  const closePanel = () => {
    setPickerVisible(false);
  };

  return (
    <div
      ref={timePickerRef}
      className={classnames('timepicker-box', className)}
    >
      <div ref={setReferenceElement}>
        <Input
          selectionMode="time"
          onFocus={onInputFocus}
          value={text}
          placeholder={placeholder}
          onIconClick={onClearText}
          enableClear={enableClear}
        />
      </div>
      {pickerVisible && (
        <div
          ref={setPopperElement}
          style={_assign(styles.popper, { zIndex: 10 })}
          {...attributes.popper}
        >
          <div
            className="ani-fade-in"
            style={{ display: pickerVisible ? 'block' : 'none' }}
          >
            <BasePanel
              selectionMode={selectionMode}
              onPick={onTimePick}
              onClose={closePanel}
              defaultDate={time}
              enableSecond={enableSecond}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
