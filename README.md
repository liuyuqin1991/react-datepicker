# react-datepicker
> datepicker基础组件，ts + react hook代码风格，支持日、周、月、季、年五种时间选择

<i>组件使用的第三方库：lodash，dayjs，classnames，rc-slider</i>

## 安装

```
npm i react-datepicker-ts

```
## 使用

```
import DatePicker from 'react-datepicker-ts';

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

### TimePicker参数

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| defaultTime | 默认时间<可选> | Date | |
| className  | 类选择器<可选> |string | |
| onPick  | 选择日期回调函数<必选> | (d: Date[]) => void | |
| format  | 显示在输入框符合dayjs规范的格式<可选> | string | 'HH:mm:ss' |
| placeholder  | 未选日期时的占位符<可选> | string | '请选择时间' |
| enableSecond  | 允许秒选择<可选> | boolean | true |