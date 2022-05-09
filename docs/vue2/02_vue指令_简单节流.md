# vue指令_简单节流

## 介绍

实现一个节流元素点击事件的`vue`指令。

## 实现

```js
//throttle.js
export default {
 bind: function(el, binding) {
     let throtting = binding.value || 2 * 1000;
     let cbFun;

     el.addEventListener('click', (event) => {
         if(!cbFun) {
             cbFun = setTimeout(() => {
                 cbFun = null;
             }, throtting)
         } else {
             //阻止同层级的click 事件不触发
             event && event.stopImmediatePropagation()
         }
     }, true)
 }
};
```

在 `main.js` 中 注册指令

```js
import copy from '@/directive/throttle.js';

Vue.directive('throttle', throttle);
```

## 使用

```vue
<template>
    <button @click="cellClick" v-throttle>Test</button>
</template>

<script>
export default {
    methods: {
        cellClick() {
        console.log("dddd");
    },
}
</script>
```