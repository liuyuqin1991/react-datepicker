import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import DatePicker from 'Src/DatePicker';
import TimePicker from 'Src/TimePicker';
import DateRangePicker from 'Src/DateRangePicker';

import './app.scss';

const Demo: React.FC = () => {
  dayjs.extend(isBetween);

  const datePick = (d: Date[]) => {
    window.console.log(
      `开始时间：${dayjs(d[0]).format(
        'YYYY/MM/DD HH:mm:ss'
      )} —— 结束时间：${dayjs(d[1]).format('YYYY/MM/DD HH:mm:ss')}`
    );
  };

  const timePick = (d: Date) => {
    window.console.log(`时间：${dayjs(d).format('YYYY/MM/DD HH:mm:ss')}`);
  };

  const disabledDateFunc = (currentDate: Date): boolean => {
    const d = dayjs(currentDate);
    const today = dayjs();
    // 只能选择当日的前后一个月日期内
    if (!d.isBetween(today.subtract(1, 'month'), today.add(1, 'month')))
      return true;
  };

  return (
    <>
      <div className="content">
        <div className="title">DatePicker组件</div>
        <div className="default">
          <div className="label-panel">1. 默认</div>
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DatePicker selectionMode="day" onPick={datePick} />
            </div>
            <div className="date-select">
              <span>周：</span>
              <DatePicker selectionMode="week" onPick={datePick} />
            </div>
            <div className="date-select">
              <span>月：</span>
              <DatePicker selectionMode="month" onPick={datePick} />
            </div>
            <div className="date-select">
              <span>季：</span>
              <DatePicker selectionMode="quarter" onPick={datePick} />
            </div>
            <div className="date-select">
              <span>年：</span>
              <DatePicker selectionMode="year" onPick={datePick} />
            </div>
          </div>
        </div>
        <div className="init">
          <div className="label-panel">2. 有初始值（初始值：2022-2-22）</div>
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DatePicker
                selectionMode="day"
                onPick={datePick}
                defaultDate="2022-2-22"
              />
            </div>
            <div className="date-select">
              <span>周：</span>
              <DatePicker
                selectionMode="week"
                onPick={datePick}
                defaultDate="2022-2-22"
                enableClear={false}
                enableShowWeekNum={false}
              />
            </div>
            <div className="date-select">
              <span>月：</span>
              <DatePicker
                selectionMode="month"
                onPick={datePick}
                defaultDate="2022-2-22"
              />
            </div>
            <div className="date-select">
              <span>季：</span>
              <DatePicker
                selectionMode="quarter"
                onPick={datePick}
                defaultDate="2022-2-22"
              />
            </div>
            <div className="date-select">
              <span>年：</span>
              <DatePicker
                selectionMode="year"
                onPick={datePick}
                defaultDate="2022-2-22"
              />
            </div>
          </div>
        </div>
        <div className="format">
          <div className="label-panel">
            3. 格式化（请使用符合dayjs规范的格式化format）
          </div>
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DatePicker
                selectionMode="day"
                onPick={datePick}
                defaultDate="2022-2-22"
                format="YYYY/MM/DD"
              />
            </div>
            <div className="date-select">
              <span>周：</span>
              <DatePicker
                selectionMode="week"
                onPick={datePick}
                defaultDate="2022-2-22"
                format="YYYY年第w周"
              />
            </div>
            <div className="date-select">
              <span>月：</span>
              <DatePicker
                selectionMode="month"
                onPick={datePick}
                defaultDate="2022-2-22"
                format="YYYY年M月"
              />
            </div>
            <div className="date-select">
              <span>季：</span>
              <DatePicker
                selectionMode="quarter"
                onPick={datePick}
                defaultDate="2022-2-22"
                format="YYYY年第Q季度"
              />
            </div>
            <div className="date-select">
              <span>年：</span>
              <DatePicker
                selectionMode="year"
                onPick={datePick}
                defaultDate="2022-2-22"
                format="YYYY年"
              />
            </div>
          </div>
        </div>
        <div className="placeholder">
          <div className="label-panel">4. 占位符</div>
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DatePicker
                selectionMode="day"
                onPick={datePick}
                placeholder="请选择开始日期"
              />
            </div>
          </div>
        </div>
        <div className="disabled">
          <div className="label-panel">
            5. 禁用（禁用采用function(currentDate:
            Date)回调，由用户自行判断禁用，return true为禁用
          </div>
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DatePicker
                selectionMode="day"
                onPick={datePick}
                disabledDateFunc={disabledDateFunc}
              />
            </div>
          </div>
        </div>
        <div className="date-time">
          <div className="label-panel">6. 启用时间（选择模式只能为日选择）</div>
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DatePicker onPick={datePick} selectionMode="daytime" />
            </div>
            <div className="date-select">
              <span>启用秒：</span>
              <DatePicker
                selectionMode="daytime"
                onPick={datePick}
                disabledDateFunc={disabledDateFunc}
                enableSecond={true}
              />
            </div>
            <div className="date-select">
              <span>预设：</span>
              <DatePicker
                selectionMode="daytime"
                onPick={datePick}
                defaultDate="2022-2-22 22:20"
              />
            </div>
          </div>
        </div>
        <div className="title">TimePicker组件</div>
        <div className="time">
          <div className="date-panel">
            <div className="date-select">
              <span>默认：</span>
              <TimePicker onPick={timePick} />
            </div>
            <div className="date-select">
              <span>预设时间：</span>
              <TimePicker
                onPick={timePick}
                defaultTime="2022-2-22 06:50"
                enableClear={false}
              />
            </div>
            <div className="date-select">
              <span>格式化：</span>
              <TimePicker
                onPick={timePick}
                defaultTime="2022-2-22 06:50"
                format="HH时mm分"
              />
            </div>
            <div className="date-select">
              <span>占位符：</span>
              <TimePicker onPick={timePick} placeholder="请选择起始时间" />
            </div>
            <div className="date-select">
              <span>启用秒：</span>
              <TimePicker
                onPick={timePick}
                defaultTime="2022-2-22 06:50:25"
                enableSecond={true}
              />
            </div>
          </div>
          <div className="design-tip">
            <p>设计思路：</p>
            1. 避免滚动 —— 对无滚轮、滚轮有问题、滚轮不灵活的用户友好
            <br />
            2. 直观显示 —— 常用时间点直观显示，方便点击，不常用时间点可拖拽操作
          </div>
        </div>
        <div className="title">DateRangePicker组件</div>
        <div className="daterange">
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DateRangePicker
                onPick={datePick}
                placeholder="请选择日期范围"
                disabledDateFunc={disabledDateFunc}
                format="YYYY年MM月DD日"
              />
            </div>
            <div className="date-select">
              <span>周：</span>
              <DateRangePicker
                onPick={datePick}
                defaultDate={['2022-2-22', '2022-4-22']}
                selectionMode="week"
                format="YYYY年第w周"
              />
            </div>
            <div className="date-select">
              <span>月：</span>
              <DateRangePicker onPick={datePick} selectionMode="month" />
            </div>
            <div className="date-select">
              <span>季：</span>
              <DateRangePicker onPick={datePick} selectionMode="quarter" />
            </div>
            <div className="date-select">
              <span>年：</span>
              <DateRangePicker onPick={datePick} selectionMode="year" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
