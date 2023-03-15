>dom结构

```html
  <div id="scroll">
    <div class="list"></div>
  </div>
```

>安装

```bash
npm install part-scroll
```

>使用方法

```js
import PartScroll from 'part-scroll'

let ps = new PartScroll('#scroll', listData);

//或者
import PartScroll from 'part-scroll'

let ele = document.querySelector("#scroll")

let ps = new PartScroll(ele, listData);

```

>初始化和监听事件

```js
ps.init({
  height: 200, //每个item元素的高度
  render: (data) => { //设置每个item的内容
    let html = `<div>我的id是：${data.uid}</div><div class="box">我的内容是是：${data.value}<span>测试文字<span></div>`;
    return html;
  }
});

//监听item元素click事件
ps.on('click', function(e, obj){
  console.log('obj', obj);
});
```

![](https://img.shields.io/badge/license-MIT-green)