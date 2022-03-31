import React from 'react';
import DatePicker from '@src/DatePicker';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import './app.scss';

const Demo: React.FC = () => {

  dayjs.extend(isBetween);

  const onPick = (d: Date[]) => {
    window.console.log(`开始时间：${dayjs(d[0]).format('YYYY/MM/DD HH:mm:ss')} —— 结束时间：${dayjs(d[1]).format('YYYY/MM/DD HH:mm:ss')}`);
  };

  const disabledDateFunc = (currentDate: Date) => {
    const d = dayjs(currentDate);
    const today = dayjs();
    // 只能选择当日的前后一个月日期内
    if (!d.isBetween(today.subtract(1, 'month'), today.add(1, 'month'))) return true;
  };

  return (
    <>
      <div className="content">
        <div className="title">
            datepicker组件demo
        </div>
        <div className="default">
          <div className="label-panel">
            1. 默认
          </div>
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DatePicker selectionMode="day" onPick={onPick}/>
            </div>
            <div className="date-select">
              <span>周：</span>
              <DatePicker selectionMode="week" onPick={onPick}/>
            </div>
            <div className="date-select">
              <span>月：</span>
              <DatePicker selectionMode="month" onPick={onPick}/>
            </div>
            <div className="date-select">
              <span>季：</span>
              <DatePicker selectionMode="quarter" onPick={onPick}/>
            </div>
            <div className="date-select">
              <span>年：</span>
              <DatePicker selectionMode="year" onPick={onPick}/>
            </div>
          </div>
        </div>
        <div className="init">
          <div className="label-panel">
            2. 有初始值（初始值：2022-2-22）
          </div>
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DatePicker selectionMode="day" onPick={onPick} defaultDate="2022-2-22"/>
            </div>
            <div className="date-select">
              <span>周：</span>
              <DatePicker selectionMode="week" onPick={onPick} defaultDate="2022-2-22"/>
            </div>
            <div className="date-select">
              <span>月：</span>
              <DatePicker selectionMode="month" onPick={onPick} defaultDate="2022-2-22"/>
            </div>
            <div className="date-select">
              <span>季：</span>
              <DatePicker selectionMode="quarter" onPick={onPick} defaultDate="2022-2-22"/>
            </div>
            <div className="date-select">
              <span>年：</span>
              <DatePicker selectionMode="year" onPick={onPick} defaultDate="2022-2-22"/>
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
              <DatePicker selectionMode="day" onPick={onPick} defaultDate="2022-2-22" format="YYYY/MM/DD" />
            </div>
            <div className="date-select">
              <span>周：</span>
              <DatePicker selectionMode="week" onPick={onPick} defaultDate="2022-2-22" format="YYYY年第w周"/>
            </div>
            <div className="date-select">
              <span>月：</span>
              <DatePicker selectionMode="month" onPick={onPick} defaultDate="2022-2-22" format="YYYY年M月"/>
            </div>
            <div className="date-select">
              <span>季：</span>
              <DatePicker selectionMode="quarter" onPick={onPick} defaultDate="2022-2-22" format="YYYY年第Q季度"/>
            </div>
            <div className="date-select">
              <span>年：</span>
              <DatePicker selectionMode="year" onPick={onPick} defaultDate="2022-2-22" format="YYYY年"/>
            </div>
          </div>
        </div>
        <div className="placeholder">
          <div className="label-panel">
            4. 占位符
          </div>
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DatePicker selectionMode="day" onPick={onPick} placeholder="请选择开始日期" />
            </div>
          </div>
        </div>
        <div className="disabled">
          <div className="label-panel">
            5. 禁用（禁用采用function(currentDate: Date)回调，由用户自行判断禁用，return true为禁用
          </div>
          <div className="date-panel">
            <div className="date-select">
              <span>日：</span>
              <DatePicker selectionMode="day" onPick={onPick} disabledDateFunc={disabledDateFunc} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;