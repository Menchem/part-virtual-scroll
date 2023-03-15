import {dataHandle} from './utils';

function scroll(el, data){
    this.outerContainer = typeof el === 'string' ? document.querySelector(el) : el;
    this.listContainer = this.outerContainer.children[0];
    this.data =  data ? dataHandle(data) : [];
    this.ITEMHEIGHT = 100;
    this.SCREENhEIGHT = this.outerContainer.getBoundingClientRect().height;
    this.ticking = false;
    this.render = () => {};
    this.itemHTML = '';
    this._events = {};
}

scroll.prototype = {
    init: function(option = {}){
        this.render = option.hasOwnProperty('render') ? option.render : () => {return ''};
        this.ITEMHEIGHT =  option.hasOwnProperty('height') ? option.height : this.ITEMHEIGHT;       
        this.scrollCallBack();
        this.outerContainer.addEventListener('scroll', this.onScroll.bind(this));
        this.listContainer.addEventListener('click', this.onClick.bind(this))
    },
    scrollCallBack: function(){
        let scrollTop = Math.max(this.outerContainer.scrollTop, 0);
        let startIndex  = Math.floor(scrollTop / this.ITEMHEIGHT);
        let endIndex =  startIndex + Math.ceil(this.SCREENhEIGHT / this.ITEMHEIGHT);
        let paddingTop = startIndex * this.ITEMHEIGHT;
        let paddingBottom = (this.data.length - endIndex) * this.ITEMHEIGHT;

        let viewData = this.data.slice(startIndex, endIndex + 1);
        let fragment = document.createDocumentFragment();
        this.listContainer.innerHTML = '';

        for(let i = 0; i < viewData.length; i++) {
            let item = document.createElement('div');
            item.className = 'list-item';                       
            let itemData = viewData[i];
            item.setAttribute('data-index', itemData.uid); 
            let html = this.render(itemData) + '';
            item.innerHTML = html;
            item.setAttribute('style', `height: ${this.ITEMHEIGHT}px;`);
            fragment.appendChild(item);
        }

        this.listContainer.appendChild(fragment);
        this.listContainer.setAttribute('style', `padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px`);

        this.ticking = false;
    },
    onScroll: function(e){
        this.trigger('scroll', e);
        if(!this.ticking){
          this.ticking = true;  
          requestAnimationFrame(this.scrollCallBack.bind(this));
        }
    },
    onClick: function(e){       
        let ev = e.target;
        let evt = ev;
        let obj = null;
        while(evt.className !== 'list-item'){
            evt = evt.parentNode;
        }
        if(evt.className === 'list-item'){
           let index =  evt.getAttribute('data-index');
           obj = this.data[Number(index) - 1];
        }
        this.trigger('click', e, obj);
    },
    extension:function(){      
        console.log('extension');
    },
    on: function(type, fn, context = this){
        if(!this._events[type]){
            this._events[type] = [];
        }
        this._events[type].push([fn, context]);
    },
    trigger: function(type){
        let events = this._events[type];
        if (!events) {
            return
        }
        let [fn, context] = events[0];
        fn.apply(context,[].slice.call(arguments, 1));
    }
}


export default scroll;


