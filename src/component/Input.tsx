import React, { useMemo, useRef } from 'react';
import { isFunction as _isFunction } from 'lodash';
import classNames from 'classnames';
import { SelectionMode } from 'Typing';
import { useHover } from 'Hook';
import 'Scss/input.scss';

interface InputProps {
  // 输入框样式
  inputClassName?: string;
  // 输入框占位文本
  placeholder?: string;
  // 绑定值
  value?: string;
  // 获取焦点事件
  onFocus?(e?: React.ChangeEvent<HTMLInputElement>): void;
  // 失去焦点事件
  onBlur?(e?: React.ChangeEvent<HTMLInputElement>): void;
  // 图标点击事件
  onIconClick?(e?: React.MouseEvent): void;
  // 日期模式
  selectionMode: SelectionMode;
  // 是否允许清除
  enableClear: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const { enableClear, onFocus, onBlur, onIconClick } = props;
  const { inputClassName, value, placeholder, selectionMode } = props;
  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const isHover = useHover(iconRef);

  const focus = (): void => {
    setTimeout(() => {
      inputRef.current.focus();
    });
  };

  const blur = (): void => {
    setTimeout(() => {
      inputRef.current.blur();
    });
  };

  const handleFocus = (
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    focus();
    if (_isFunction(onFocus)) {
      onFocus(e.target.value, e);
    }
  };

  const handleBlur = (
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    blur();
    if (_isFunction(onBlur)) {
      onBlur(e.target.value, e);
    }
  };

  const handleIconClick = () => {
    if (value && enableClear) {
      onIconClick();
    }
  };

  const iconCls = useMemo(() => {
    return `input-icon ${
      value && isHover && enableClear
        ? 'icon-close'
        : selectionMode === 'time'
        ? 'icon-time'
        : 'icon-calendar'
    }`;
  }, [value, isHover]);

  return (
    <div className="input-box">
      <input
        className={classNames(inputClassName)}
        value={value}
        readOnly
        placeholder={placeholder}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className={iconCls} ref={iconRef} onClick={handleIconClick}></div>
    </div>
  );
};

export default Input;
