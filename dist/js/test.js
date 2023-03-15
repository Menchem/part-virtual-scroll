//import "./main.css";
//import axios from 'axios';
import PartScroll from './part-scroll.js';

console.log(PartScroll.version);


let listData = [];

axios.interceptors.response.use(res => res.data);

axios.get('http://localhost:3000/listData').then((res) => {   
    listData = res;
    let s1 = new PartScroll('#scroll', listData);
    s1.init({
        height: 200,
        render: (data) => {
            let html = `<div>我的id是：${data.uid}</div><div class="box">我的内容是是：${data.value}<span>测试文字<span></div>`;
            return html;
        }
    });
    s1.on('click', function(e, obj){
        console.log('点击的对象:', obj);
        console.log('点击的内容:', obj.value);
    });
});