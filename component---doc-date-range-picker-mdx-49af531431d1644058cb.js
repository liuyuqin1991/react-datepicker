(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{TFSr:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return m})),a.d(t,"default",(function(){return u}));var n=a("Fcif"),o=a("+I+c"),r=(a("mXGw"),a("/FXl")),c=a("TjRS"),d=a("ZFoC"),i=a("o/wc"),s=a("jTUD"),D=a.n(s),b=(a("aD51"),["components"]),m={};void 0!==m&&m&&m===Object(m)&&Object.isExtensible(m)&&!Object.prototype.hasOwnProperty.call(m,"__filemeta")&&Object.defineProperty(m,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"doc/DateRangePicker.mdx"}});var p={_frontmatter:m},l=c.a;function u(e){var t,a,s=e.components,u=Object(o.a)(e,b);return Object(r.b)(l,Object(n.a)({},p,u,{components:s,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"daterangepicker"},"DateRangePicker"),Object(r.b)("p",null,"范围双日期选择组件，支持日，周，月，季，年 5 种日期维度选择；"),Object(r.b)("h2",{id:"默认"},"默认"),Object(r.b)(d.c,{__position:0,__code:"() => {\n  /*\n   * 回调参数d包含开始和结束日期的数组，当只是日期选择而不包含时间选择时，时间部分均为当前时间\n   * 1. 选择day模式，startDate为起始日期，endDate为结束日期\n   * 2. 选择week模式，startDate为起始日期里选择的周的第一天，endDate为结束日期里选择的周的最后一天\n   * 3. 选择month模式，startDate为起始日期里选择的月的第一天，endDate为结束日期里选择的月的最后一天\n   * 4. 选择quarter模式，startDate为起始日期里选择的季度的第一天，endDate为结束日期里选择的季度的最后一天\n   * 5. 选择year模式，startDate为起始日期里选择的年的第一天，endDate为结束日期里选择的年的最后一天\n   */\n  const dateRangePick = d => {\n    const startDate = d[0]\n    const endDate = d[1]\n    window.console.log(\n      `开始日期：${dayjs(startDate).format(\n        'YYYY/MM/DD HH:mm:ss',\n      )} —— 结束日期：${dayjs(endDate).format('YYYY/MM/DD HH:mm:ss')}`,\n    )\n  }\n  return <DateRangePicker onPick={dateRangePick} />\n}",__scope:(t={props:u,DefaultLayout:c.a,Playground:d.c,Props:d.d,DateRangePicker:i.a,dayjs:D.a},t.DefaultLayout=c.a,t._frontmatter=m,t),mdxType:"Playground"},(function(){return Object(r.b)(i.a,{onPick:function(e){var t=e[0],a=e[1];window.console.log("开始日期："+D()(t).format("YYYY/MM/DD HH:mm:ss")+" —— 结束日期："+D()(a).format("YYYY/MM/DD HH:mm:ss"))},mdxType:"DateRangePicker"})})),Object(r.b)("h2",{id:"预设值"},"预设值"),Object(r.b)("p",null,"默认日期，数组类型，需要放入一个开始日期和一个结束日期。"),Object(r.b)(d.c,{__position:1,__code:"<DateRangePicker defaultDate={['2022-2-22', '2022-4-22']} />",__scope:(a={props:u,DefaultLayout:c.a,Playground:d.c,Props:d.d,DateRangePicker:i.a,dayjs:D.a},a.DefaultLayout=c.a,a._frontmatter=m,a),mdxType:"Playground"},Object(r.b)(i.a,{defaultDate:["2022-2-22","2022-4-22"],mdxType:"DateRangePicker"})),Object(r.b)("h2",{id:"详细-api"},"详细 API"),Object(r.b)(d.d,{of:i.a,mdxType:"Props"}))}void 0!==u&&u&&u===Object(u)&&Object.isExtensible(u)&&!Object.prototype.hasOwnProperty.call(u,"__filemeta")&&Object.defineProperty(u,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"doc/DateRangePicker.mdx"}}),u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---doc-date-range-picker-mdx-49af531431d1644058cb.js.map