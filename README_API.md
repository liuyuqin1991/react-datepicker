# API参数详细说明

## selectionMode

> String | 可选 | v1.0

日期模式，默认值为`day`，可选值为` day | week | month | quarter | year `。

## defaultDate

> Date | 可选 | v1.0

默认日期。

## className

> String | 可选 | v1.0

日期组件容器className。

## onPick

> Function | 必选 | v1.0

选择日期回调函数.

示例:

```
/*
* 回调参数d包含开始和结束日期的数组，当只是日期选择而不包含时间选择时，时间部分均为当前时间
* 1. 选择day模式，startDate与endDate相等
* 2. 选择week模式，startDate为当周起始日期，endDate为当周结束日期
*/
const onPick = (d: Date[]) => {
  const startDate = d[0];
  const endDate = d[1];
};
```

## format

> String | 可选 | v1.0

显示在输入框的格式。组件引入了dayjs，必须符合dayjs的format规范。[查看format规范](https://dayjs.gitee.io/docs/zh-CN/display/format)

## placeholder

> String | 可选 | v1.0

未选日期的占位符。

## disabledDateFunc

> Function | 可选 | v1.0

禁用日期回调函数。

示例：

```

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const disabledDateFunc = (currentDate: Date) => {
  const d = dayjs(currentDate);
  const today = dayjs();
  // 只能选择当日的前后一个月日期内
  if (!d.isBetween(today.subtract(1, 'month'), today.add(1, 'month'))) return true;
};

```
