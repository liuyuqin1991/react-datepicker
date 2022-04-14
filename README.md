# react-datepicker
DatePicker基础组件，react hook + typescript 代码风格，日期组件支持日、周、月、季、年选择，时间组件支持标准时、分、秒选择。

> <i>组件使用的第三方库：lodash，dayjs，classnames，react-popper，rc-slider</i>

## 试用

[Demo地址](https://liuyuqin1991.github.io/react-datepicker/)

## 安装

```
npm i react-datepicker-ts

```
## 使用

```
import { DatePicker } from 'react-datepicker-ts';

<DatePicker selectionMode="day" onPick={onPick} defaultDate="2022-2-22" format="YYYY/MM/DD" />

// or
import { TimePicker } from 'react-datepicker-ts';

<TimePicker onPick={timePick} defaultTime="2022-2-22 06:50:25" placeholder="请选择起始时间" enableSecond={false}

```

## 主题色变更

组件默认采用的是绿色主题色系，如需变更，只需要在项目css中重写两个主题色相关变量即可，如下图改为antd主题色
```
// index.css 
:root {
  --c-datepicker-primary: #1890FF;
  --c-datepicker-primary-light: #bae7ff;
}
```

## API

[查看API参数详细介绍](./README_API.md)

### DatePicker参数

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| selectionMode | 日期类型<可选> | string | day |
| defaultDate | 默认日期<可选> | Date | |
| className  | 类选择器<可选> |string | |
| onPick  | 选择日期回调函数<必选> | (d: Date[]) => void | |
| format  | 显示在输入框符合dayjs规范的格式<可选> | string | '请选择日期' |
| placeholder  | 未选日期时的占位符<可选> | string | '请选择日期'|
| disabledDateFunc  | 禁用日期回调函数<可选> | (d: Date) => boolean | |
| enableClear  | 允许日期清除<可选> | boolean | true |

### TimePicker参数

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| defaultTime | 默认时间<可选> | Date | |
| className  | 类选择器<可选> |string | |
| onPick  | 选择日期回调函数<必选> | (d: Date[]) => void | |
| format  | 显示在输入框符合dayjs规范的格式<可选> | string | 'HH:mm:ss' |
| placeholder  | 未选日期时的占位符<可选> | string | '请选择时间' |
| enableSecond  | 允许秒选择<可选> | boolean | true |
| enableClear  | 允许时间清除<可选> | boolean | true |