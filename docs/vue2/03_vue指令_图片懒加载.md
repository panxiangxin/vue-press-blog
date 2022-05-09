# vue指令_图片懒加载

## 介绍

实现一个图片元素懒加载的`vue`指令。

主要原理就是：监听滚动事件，判断当前元素是否出现在可视窗口区域，出现的话，将之前放在`data-src`中的真正`src`地址替换。实现懒加载。

### 1. 利用 `intersectionObserver API` 直接判断

下面是这个特性的兼容性：

![](/lazy/support.webp)

### 2. 监听 `scroll` 事件 计算元素位置

这个是最适应的写法，使用于大部分的环境。

监听滚动事件，判断元素`el` 出现在 可视区域的两个必要条件

- 1. `el.getBoundingClientRect().top - document.documentElement.clientHiehgt < 0` 从下方滚入可视区域
- 2. `el.getBoundingClientRect().bottom > 0` 防止滚动过快 直接滚动到可视区域上方，这种情况不加载真正图片

## 实现

```js
//lazy.js
const LazyLoad = {
 install: (Vue, options) {
     let defaultSrc = options.default;
     //注册指令 v-lazy
     Vue.directive("lazy", {
         
         bind(el, binding) {
             LazyLoad.init(el, binding.value, defaultSrc)
         },

         inserted(el) {
             //判断是否支持 intersectionObserver API 
             if("IntersectionObserver" in window) {
                 LazyLoad.observe(el);
             } else {
                 LazyLoad.listenerScroll(el);
             }
         }
     })
 }, 

 init(el, src, defaultSrc) {
     el.setAttribute('data-src', src);
     el.setAttribute('src', defaultSrc);
 },

 observe(el) {
     // IntersectionObserver支持两个参数：callback是当被监听元素的可见性变化时，触发的回调函数 options是一个配置参数，可选，有默认的属性值
     let io = new IntersectionObserver((entries) => {
         let realSrc = el.dataset.src;
         //元素可见
         if(entries[0].isIntersecting) {
             if(realSrc) {
                 el.src = realSrc;
                 el.removeAttribute('data-src');
             }
         }
     })
    // 对元素el添加监听，当el元素变化时，就会触发上述的回调
     io.observe(el);
 }, 

 listenerScroll(el) {
     //节流 节省资源
     let handler = LazyLoad.throttle(LazyLoad.load, 300);

     window.addEventListener("scroll", () => {
      handler(el);
    });
 },

 load(el) {
     //窗口高度
     let windowHight = document.documentElement.clientHiehgt;
    //元素顶部和底部距离窗口上边界的距离
     let elTop = el.getBoundingClientRect().top;
     let elBottom = el.getBoundingClientRect().bottom;

     let realSrc = el.dataset.src;
     //判断元素是否出现在 界面可视区域
     if(elTop - windowHight < 0 && elBottom > 0) {
         el.src = realSrc;
         el.removeAttribute("data-src");
     }
 }, 
 //节流函数 多次点击 delay 时间之内只会触发一次
 throttle(fn, delay) {
     let timer;
     let prevTime;

     return function(...args) {
         
         let context = this;
         let currentTime = Date.now();
         if(!prevTime) prevTime = currentTime;

         if(timer) clearTimeout(timer);

         if(currentTime - prevTime > delay) {
             prevTime = currentTime;
             fn.apply(context, args);
             clearTimeout(timer);
             return;
         }

         timer = setTimeout(() => {
             prevTime = Date.now();
             fn.apply(context, args);
             timer = null;
         }, delay);
     }
 }
};

export default LazyLoad;
```

在 `main.js` 中 注册指令

```js
import LazyLoad from "./plugins/lazy";
//设置默认展示背景图片
Vue.use(LazyLoad, {
  default: "favicon.ico",
});
```

## 使用

```vue
<template>
    <img class="img" v-lazy="'img/one.png'" />
    <img class="img" v-lazy="'img/two.png'" />
    <img class="img" v-lazy="'img/three.png'" />
    <img class="img" v-lazy="'img/one.png'" />
    <img class="img" v-lazy="'img/two.png'" />
    <img class="img" v-lazy="'img/three.png'" />
    <img class="img" v-lazy="'img/one.png'" />
    <img class="img" v-lazy="'img/two.png'" />
    <img class="img" v-lazy="'img/three.png'" />
    <img class="img" v-lazy="'img/one.png'" />
    <img class="img" v-lazy="'img/two.png'" />
    <img class="img" v-lazy="'img/three.png'" />
</template>
<!-- 这里必须设置 img 元素的 高度 和 大小 不然 isIntersecting 判断会有问题-->
<style>
.img {
  width: 1000px;
  height: 500px;
}
</style>
```