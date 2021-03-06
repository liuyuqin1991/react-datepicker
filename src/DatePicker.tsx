import React, { useState, useRef } from 'react';
import { assign as _assign, isFunction as _isFunction } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import classnames from 'classnames';
import { usePopper } from 'react-popper';

import { DEFAULT_PLACEHOLDER_MAP } from 'Src/constants';
import { useClickOutside } from 'Hook';
import { singleDateToText, getDefaultFormat } from 'Util';
import { Input, BasePanel } from 'Component';

import 'Scss/picker.scss';

export interface DatePickerProps {
  /**
   * 模式，可选
   * @default 默认: day
   */
  selectionMode?: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'daytime';
  /**
   * 初始日期，可选
   */
  defaultDate?: Date | string;
  /**
   * 点击日期回调，可选
   * @default 默认: () => {}
   */
  onPick?: (date: Date[]) => void;
  /**
   * 格式化，可选
   */
  format?: string;
  /**
   * 占位符，可选
   */
  placeholder?: string;
  /**
   * 禁用日期回调，可选
   */
  disabledDateFunc?: (date: Date) => boolean;
  /**
   * 样式名称，可选
   */
  className?: string;
  /**
   * 是否开启日期清除，可选
   * @default 默认: true
   */
  enableClear?: boolean;
  /**
   * 是否开启周数显示，可选
   * @default 默认: true
   */
  enableShowWeekNum?: boolean;
  /**
   * 是否显示秒，可选
   * @default 默认: false
   */
  enableSecond?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    className,
    selectionMode = 'day',
    enableSecond = false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPick = () => {},
    format = getDefaultFormat(selectionMode, enableSecond),
    defaultDate,
    placeholder = DEFAULT_PLACEHOLDER_MAP[selectionMode],
    enableClear = true,
    enableShowWeekNum = true,
    disabledDateFunc,
  } = props;
  // state
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs>(dayjs(defaultDate));
  const [text, setText] = useState<string>(
    defaultDate ? singleDateToText(date, format) : ''
  );
  const datePickerRef = useRef<HTMLDivElement>(null);
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
  // 扩展dayjs的功能
  dayjs.extend(advancedFormat);
  dayjs.extend(weekOfYear);

  useClickOutside(datePickerRef, () => {
    setPickerVisible(false);
  });

  const onInputFocus = () => {
    if (!pickerVisible) {
      setPickerVisible(true);
    }
  };

  const onDatePick = (d: Dayjs[]) => {
    setDate(d[1]);
    setText(singleDateToText(d[1], format));
    if (_isFunction(onPick)) {
      onPick([d[0].toDate(), d[1].toDate()]);
    }
    setPickerVisible(false);
  };

  // 仅在daytime模式时，点击日期时调用
  const virtualDatePick = (d: Dayjs[]) => {
    setDate(d[1]);
  };

  const clearText = () => {
    setText('');
    setDate(dayjs());
  };

  const closePanel = () => {
    setPickerVisible(false);
  };

  return (
    <div
      ref={datePickerRef}
      className={classnames('datepicker-box', className)}
    >
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
      <div
        ref={setPopperElement}
        style={_assign(styles.popper, {
          zIndex: 10,
        })}
        {...attributes.popper}
      >
        {pickerVisible && (
          <div className="ani-fade-in">
            <BasePanel
              selectionMode={selectionMode}
              onPick={onDatePick}
              onVirtualPick={virtualDatePick}
              onClose={closePanel}
              defaultDate={date}
              enableShowWeekNum={enableShowWeekNum}
              disabledDateFunc={disabledDateFunc}
              enableSecond={enableSecond}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
