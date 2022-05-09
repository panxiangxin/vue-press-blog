# vue指令_点击复制

## 介绍

实现一个点击元素复制文本的`vue`指令，具体指令相关可以阅读参考相关[官方博客](https://cn.vuejs.org/v2/guide/custom-directive.html)。

## 实现

```js
//copy.js
export default {
  bind(el, { value }) {
    el.$value = value;
    el.handler = () => {
      if (!el.$value) {
        console.log("无复制内容！");
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.readOnly = "readonly";
      textarea.position = "absolute";
      textarea.left = "9999px";

      textarea.value = el.$value;

      console.log(value);

      document.appendChild(textarea);

      textarea.select();

      let result = document.execCommand(textarea);
      if (result) {
        alert("复制成功");
      }

      document.removeChild(textarea);
    };

    el.addEventListener("click", el.handler);
  },

  componentUpdated(el, { value }) {
    el.$value = value;
  },
  unbind(el) {
    el.removeEventListener("click", el.handler);
  },
};
```

在 `main.js` 中 注册指令

```js
import copy from '@/directive/copy.js';

Vue.directive('copy', copy);
```

## 使用

```js
<div v-copy="'test'">
      test
 </div>
```