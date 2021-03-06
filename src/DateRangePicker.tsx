import React, { useState, useRef } from 'react';
import { assign as _assign, isFunction as _isFunction } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import classnames from 'classnames';
import { usePopper } from 'react-popper';

import { DEFAULT_FORMATS_MAP, DEFAULT_PLACEHOLDER_MAP } from 'Src/constants';
import { rangeDateToText } from 'Util';
import { Input, DateRangePanel } from 'Component';
import 'Scss/picker.scss';

interface DateRangePickerProps {
  /**
   * 模式，可选
   * @default 默认: day
   */
  selectionMode?: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'daytime';
  /**
   * 初始日期，可选
   */
  defaultDate?: Date[] | string[];
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
   * 标题显示文本
   * @default 默认: ‘请选择日期范围’
   */
  titleLabel?: string;
  /**
   * 起始，结束日期显示文本
   * @default 默认: ['起始日期：', '结束日期：']
   */
  contentLabel?: string[];
}

const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  const {
    className,
    selectionMode = 'day',
    onPick,
    format = DEFAULT_FORMATS_MAP[selectionMode],
    defaultDate,
    placeholder = DEFAULT_PLACEHOLDER_MAP['date-range'],
    enableClear = true,
    enableShowWeekNum = true,
    titleLabel = '请选择日期范围',
    contentLabel = ['起始日期：', '结束日期：'],
    disabledDateFunc,
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
  const [text, setText] = useState<string>(
    defaultDate ? rangeDateToText(date, format) : ''
  );
  const dateRangePickerRef = useRef<HTMLDivElement>(null);
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

  const onInputFocus = () => {
    if (!pickerVisible) {
      setPickerVisible(true);
    }
  };

  // 点击确定后的回调函数
  const datePick = (d: Dayjs[]) => {
    setDate(d);
    setText(rangeDateToText(d, format));
    if (_isFunction(onPick)) {
      onPick([d[0].toDate(), d[1].toDate()]);
    }
    setPickerVisible(false);
  };

  const clearText = () => {
    setText('');
    setDate([dayjs(), dayjs()]);
  };

  const closePanel = () => {
    setPickerVisible(false);
  };

  return (
    <div
      ref={dateRangePickerRef}
      className={classnames('daterangepicker-box', className)}
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
      {pickerVisible && (
        <div
          ref={setPopperElement}
          style={_assign(styles.popper, { zIndex: 10 })}
          {...attributes.popper}
        >
          <DateRangePanel
            selectionMode={selectionMode}
            onPick={datePick}
            onClose={closePanel}
            defaultDate={date}
            disabledDateFunc={disabledDateFunc}
            format={format}
            enableShowWeekNum={enableShowWeekNum}
            titleLabel={titleLabel}
            contentLabel={contentLabel}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
