# API参数详细说明

## DatePicker 参数

### selectionMode

> String | 可选 | v1.0

日期模式，默认值为`day`，可选值为` day | week | month | quarter | year `。

### defaultDate

> Date | 可选 | v1.0

默认日期。

### className

> String | 可选 | v1.0

日期组件容器className。

### onPick

> Function | 必选 | v1.0

选择日期回调函数.

示例:

```
/*
* 回调参数d包含开始和结束日期的数组，当只是日期选择而不包含时间选择时，时间部分均为当前时间
* 1. 选择day模式，startDate与endDate相等
* 2. 选择week模式，startDate为当周的起始日期，endDate为当周的结束日期
* 3. 选择month模式，startDate为当月的起始日期，endDate为当月的结束日期
* 4. 选择quarter模式，startDate为当季度的起始日期，endDate为当季度的结束日期
* 5. 选择year模式，startDate为当年的起始日期，endDate为当年的结束日期
*/
const onPick = (d: Date[]) => {
  const startDate = d[0];
  const endDate = d[1];
};
```

### format

> String | 可选 | v1.0

显示在输入框的格式。组件引入了dayjs，必须符合dayjs的format规范。[查看format规范](https://dayjs.gitee.io/docs/zh-CN/display/format)

### placeholder

> String | 可选 | v1.0

未选日期时的占位符。

### disabledDateFunc

> Function | 可选 | v1.0

禁用日期回调函数。

示例：

```

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const disabledDateFunc = (currentDate: Date): boolean => {
  const d = dayjs(currentDate);
  const today = dayjs();
  // 只能选择当日的前后一个月日期内
  if (!d.isBetween(today.subtract(1, 'month'), today.add(1, 'month'))) return true;
};

```

### enableClear

> Boolean | 可选 | v2.0

允许日期清除，默认为true。

### enableShowWeekNum

> Boolean | 可选 | v3.0

允许周数显示，默认为true。

## TimePicker 参数

### defaultTime

> Date | 可选 | v2.0

默认时间。

### className

> String | 可选 | v2.0

时间组件容器className。

### onPick

> Function | 必选 | v2.0

选择时间回调函数.

示例:

```
/*
* 回调参数d为一个Date时间，只有时分秒有效
*/
const onPick = (d: Date) => {
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();
};
```

### format

> String | 可选 | v2.0

显示在输入框的格式。组件引入了dayjs，必须符合dayjs的format规范。[查看format规范](https://dayjs.gitee.io/docs/zh-CN/display/format)

### placeholder

> String | 可选 | v2.0

未选时间时的占位符。
### enableSecond

> Boolean | 可选 | v2.0

允许秒选择，默认为true。

### enableClear

> Boolean | 可选 | v2.0

允许时间清除，默认为true。


## DateRangePicker 参数

### selectionMode

> String | 可选 | v3.0

日期模式，默认值为`day`，可选值为` day | week | month | quarter | year `。

### defaultDate

> Date[] | 可选 | v3.0

默认日期，数组类型，需要放入一个开始日期和一个结束日期。

### className

> String | 可选 | v3.0

日期组件容器className。

### onPick

> Function | 必选 | v3.0

选择日期回调函数.

示例:

```
/*
* 回调参数d包含开始和结束日期的数组，当只是日期选择而不包含时间选择时，时间部分均为当前时间
* 1. 选择day模式，startDate为起始日期，endDate为结束日期
* 2. 选择week模式，startDate为起始日期里选择的周的第一天，endDate为结束日期里选择的周的最后一天
* 3. 选择month模式，startDate为起始日期里选择的月的第一天，endDate为结束日期里选择的月的最后一天
* 4. 选择quarter模式，startDate为起始日期里选择的季度的第一天，endDate为结束日期里选择的季度的最后一天
* 5. 选择year模式，startDate为起始日期里选择的年的第一天，endDate为结束日期里选择的年的最后一天
*/
const onPick = (d: Date[]) => {
  const startDate = d[0];
  const endDate = d[1];
};
```

### format

> String | 可选 | v3.0

显示在输入框的格式。组件引入了dayjs，必须符合dayjs的format规范。[查看format规范](https://dayjs.gitee.io/docs/zh-CN/display/format)

### placeholder

> String | 可选 | v3.0

未选日期时的占位符。

### disabledDateFunc

> Function | 可选 | v3.0

禁用日期回调函数。禁用日期会同时在起始和结束日期选择里生效

示例：

```

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const disabledDateFunc = (currentDate: Date): boolean => {
  const d = dayjs(currentDate);
  const today = dayjs();
  // 只能选择当日的前后一个月日期内
  if (!d.isBetween(today.subtract(1, 'month'), today.add(1, 'month'))) return true;
};

```

### enableClear

> Boolean | 可选 | v3.0

允许日期清除，默认为true。

### enableShowWeekNum

> Boolean | 可选 | v3.0

允许周数显示，默认为true。

### titleLabel

> String | 可选 | v3.0

标题文字，默认值为'请选择日期范围'。

### contentLabel

> String[] | 可选 | v3.0

内容文字数组，默认值为['起始日期：', '结束日期：']。


