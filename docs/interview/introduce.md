# 面试项目经历介绍

## 要点

就职于远光软件大数据事业部。主要从事资金监控产品的开发，这里的产品包括资金*调控大屏*、*Web端资金监控系统*、*小程序端资金监控App*。

面试主要突出自己使用的技术栈，以及自己在团队中的定位，解决的问题和方案，不是自己解决的只要自己熟悉都可以说。

## 1. 资金调控大屏

主要面向国家电网以及各大网省公司推出的资金监控大屏。

使用的技术栈是`Vue2 + echarts`。表格组件使用的是独立封装的`easyui-datagrid`组件。也可以说基于 `vxe-grid` 自己封装的表格弹出组件，`PC`端那个。

### 资金调控大屏遇到的问题以及解决

#### 1. 利用浏览器Zoom属性做各种大屏不同分辨率的适应性改造

因为最先做的是国家电网的大屏，所以UI设计的尺寸大小是根据国家电网的尺寸来的。但是后面做其他网省大屏时，各个网省大屏的分辨率是各不相同，并且他们设备的长宽比也是各不相同的。
比如说国家电网是 `6300 * 2100` 但是有个网省他要的分辨率是 `10400 * 3600`，大小和比例是完全不一样的。又因为网省大屏需要基于我们根据国家电网典设版功能的改造，所以必须最大限度兼容这个分辨率问题。所以我们利用`Zoom`属性进行大屏长宽某一个方向上的放大和缩小适应网省大屏的分辨率。那么这里另一个方向必然存在空白的问题，因为大屏是不能出现滚动条的，所以不然让他和移动端一样让他在高度上自适应出现滚动条，所以这个空白问题很难解决，我们这里是通过和客户沟通，换一个大背景作为新的底图，然后再空白的地方加上网省自己的个性化分析单元，这里既客户也能接受，我们也最大限度兼容的典设版的大屏功能和界面。

#### 2. Zoom放大导致Echarts鼠标交互位置不对

因为`Zoom`属性是变焦放大，导致之前`echarts`图表的`hover`和*点击事件*的位置错位。这里的解决方法是首先通过zoom还原，然后在通过 `translate: scale` 属性进行相应比例放大。

#### 3. 如果这里问组件的封装，你可以参考PC端的穿透表格组件封装去说一下思路。

PC端的表格组件下面会说。

#### 4. 这里可能会问一些echarts相关知识，比如说 echarts 渲染方式有几种？ 

渲染模式分为 `SVG` 和 `Canvas`。他们的区别在于移动设备的显示和大数据渲染的情况。

- 在移动设备分辨率不同和我们使用大屏利用 `Zoom` 放大缩小比例之后， `Canvas` 渲染会导致失真模糊化。而因为 `SVG`是矢量图，放大缩小不会失真，适应不同分辨率以及放缩比例。
- 图表在渲染大量数据的情况下：`SVG` 的性能不如 `Canvas`。
- 但是在一般情况下，这两者的区别不是很大，可以随意使用。

#### 5. 这里可能会问关于 echarts 配置的封装

这里一般说

- 第一步，根据 `echarts` 抽离各种公共基本配置， 比如 `dataZoom`, `grid`, `pie`, `line`单独配置文件， 这里是大屏主题的echarts配置。
- 第二步，根据 公共基本配置封装各种图形具体的配置 比如`BarLineChart`, `LinesChart`... 等等，公共图形封装配置。
- 第三步，自动导出配置导出挂载到`Vue`示例`prototype`上面, 全局可用。（这里自动导出主要是利用`webapck` 的 `require.context()`方法）

## 2. 资金监控PC端

大屏主要作为数据展示，数据操作方面的交互比较少。而数据操作交互我们在我们这里开发的Web端的系统，主要是提供对于资金数据和相关复杂业务功能的实现。

### 技术栈

`Vue-cli` 搭建，基于 `Vue2 + Vuex + Vue-router + Vxe-table + echarts + elementUI` 实现

#### 基于 Vxe-table 的多层穿透表格封装

这里我们是通过导出穿透表格数组配置，组件读取数组对象配置来渲染相应穿透表格。这里的穿透表格配置主要有：

- 1. 表格组件类型：普通表格 和 树形表格 （其实还有其他懒加载表格 这里可以不说， 原理都类似）
- 2. 表格列配置： 这里我们没有写在前端代码里面，放到了数据库配置里面，原因主要是这里检修修改数据库数据的方便性大于改前端代码的情况。
- 3. 表格取数配置： 这里我们资金编写请求信息 去请求表格数据
- 4. 表格下一层穿透位置： 这里因为一个穿透配置数据，可能一层不同条件有多种穿透，所以不能简单的+1取下一层配置，所以可以给用户自定义配置返回下标，更为准确

比如下面的示例配置：

```js
const gridConfig = [{
    // 渲染的组件名
    "component": 'TreeLazyTable',
    // 弹窗标题
    "title": "月预算",
    // 表格列ID
    "table_columns_id": "gsjygk_zhgjtx_nbyz_table",
    // 请求类型，分preview和pgdata，三方接口
    "requestType": "interface",
    // 请求参数，由函数返回，穿透时默认会传入行和列记录
    "requestParameter": function({ row, column, globalParam }) {
        return {
           //...表格取数
        }
    },
    // 下个弹窗的配置下标 
    "getNextConfigIndex": function({row, column}) {
        return 1;
    },
   //...
}]
```

这个表格组件其实分为两个部分：

- 1. 首先是基于 Vxe-table 的表格进行基本的封装，这里主要是改下样式，以及API功能的封装更改。
- 2. Vue全局的弹出组件插件。
- 3. 基础上面两个基本组件组合封装出多层穿透表格组件。

##### 1. vxe-table基本表格封装

使用`vxe-table` 而不使用 `elementui` 的 `table` 控件，主要是`elementui` 的表格组件在大量数据情况下的性能不好，会卡顿，这里主要是因为`elementui` 的`hover` `tooltip` 会导致表格的重新渲染。`vxe-table`在这方面表现不错，并且功能齐全。

我们这里对于`vxe-table`的封装主要是基于 `vxe-table` 的 `vxe-grid`。我们根据我们之前的穿透所需配置封装了表格的点击事件，还有监听传入参数自动取数，并且分为 `TreeTable`, 和 `NormalTable`两种组件。

##### 2. Vue 全局的自定义弹出框插件

弹窗组件这里主要是封装了弹窗的打开关闭，放大， 缩小和基本样式。内容是用户自定义的。

这里抽离出自定义弹出框组件而不放在和表格组件里面，主要是弹出组件内容不只是表格组件，也有其他需要自定义的组件内容。所以这里主要是编写了一个全局弹出窗插件，弹出窗里面的内容，我们设置一个属性`component`去指定用户自定义弹出内容组件， 我们去固定内容组件目录，去寻找用户相应内容组件。实现了弹窗组件自动化注册。不必一个个去注册了。

这里主要是使用了 `webpack.require` 方法可以帮我们读取目录下面的组件模块。我们可以在弹窗组件里面里面统一注册这些组件。示例代码：

```js
const allComponents = require.context("./", true, /\.vue$/)

let res_components = {}
allComponents.keys().forEach(fileName => {
    let comp = allComponents(fileName)
    res_components[fileName.replace(/^\.\/(.*)\.\w+$/, '$1')] = comp.default
})

export default res_components

```
在`Vue`中使用

```vue
<script>
 import allComponents from './dialogComponents/index.js'
    
 export default {
        components: allComponents,
        //.....
 }
</script>
```

```js
/**
 * 普通弹窗，基本功能
 */
import Vue from "vue"
import NormalDialogPanelComponent from "@/template/normalDialogPanel"
import store from '@/store/index'
import router from '@/router/index'

const NormalDialogPanel = {}

// install是vue官方提供的开发插件的key值
NormalDialogPanel.install = (Vue) => {
    
    const NormalDialogPanelMain = {
        show(info = {}) {
            // 每次的弹窗都是一个新的实例
            // 将组件变成一个类
            const NormalDialogPanelClass = Vue.extend({
                ...NormalDialogPanelComponent,
                store,
                router
            })
            // 实例化类
            const instance = new NormalDialogPanelClass()
            // 实例化的对象挂载到一个新的div
            instance.$mount(document.createElement("div"))
            // 添加到 #zjjk-pc-app
            document.getElementById("zjjk-pc-app").appendChild(instance.$el)
            // 标题
            instance.titleText = info.title || "请设置标题"
            // 传入组件的参数
            instance.config = info.config || {}
            // 要渲染的组件名
            instance.currentComponentName = info.component || ''
            // 是否使用默认的窗体，默认是使用
            instance.isUseDefaultPanel = info.isUseDefaultPanel === undefined ? true : info.isUseDefaultPanel
            // 在不使用默认窗体情况下，是否使用自适应，默认是不使用
            instance.isSelfAdaption = info.isSelfAdaption === undefined ? false : info.isSelfAdaption
            // 目前弹窗数量
            let instanceCount = $("#zjjk-pc-app").find(".zjjk-pc-app-masking").length
            instance.callback = (instanceCount > 1)
            instance.isTransparent = (instanceCount > 1)
        }
    }
    
    Vue.prototype.$normalDialogPanel = NormalDialogPanelMain
}

export default NormalDialogPanel
```

##### 3. Vue 全局的多层穿透弹出框插件

多层穿透表格组件就是监听了表格组件的点击事件，然后取上面用户表格数组配置下一项的配置，渲染弹窗组件。其实就是弹窗组件固定是内容是表格组件。

```js
/**
 * 弹窗，可能只适合于穿透表格
 */
import Vue from "vue"
import DialogPanelComponent from "@/template/dialogPanel"
import store from '@/store/index'

const DialogPanel = {};

// install是vue官方提供的开发插件的key值
DialogPanel.install = (Vue) => {
    
    const DialogPanelMain = {
        show(config, currentConfigIndex, currentReceiveParam, isNeedMaximize) {
            // 每次的弹窗都是一个新的实例
            // 将组件变成一个类
            const DialogPanelClass = Vue.extend({
                ...DialogPanelComponent,
                store
            })
            // 实例化类
            const instance = new DialogPanelClass()
            // 实例化的对象挂载到一个新的div
            instance.$mount(document.createElement("div"))
            // 添加到 #zjjk-pc-app
            document.getElementById("zjjk-pc-app").appendChild(instance.$el)
            // 所有配置
            instance.config = config
            // 当前弹窗配置下标
            instance.currentConfigIndex = currentConfigIndex
            // 参数列表
            instance.currentReceiveParam = currentReceiveParam
            // 是否显示最大化按钮
            instance.isNeedMaximize = isNeedMaximize === undefined ? true : isNeedMaximize
            
            // 目前弹窗数量
            let instanceCount = $("#zjjk-pc-app").find(".zjjk-pc-app-masking").length
            instance.callback = (instanceCount > 1)
            instance.isTransparent = (instanceCount > 1)
        }
    }
    
    Vue.prototype.$dialogPanel = DialogPanelMain
}

export default DialogPanel
```

重写我们的表格点击事件，进行下一层判断, 下面是关键代码: 判断用户配置的 `getNextConfigIndex` 进行下一层穿透表格渲染, `this.$dialogPanel`方法就是在弹出一个组件弹窗覆盖在上面。因为都使用了绝对定位，相同位置不设置 `z-index` 情况下的元素是后面的覆盖前面的。

```js
 // 点击事件
    cellClick({ row, column }) {
      //...
      // 如果有下一个弹窗的配置
      if (this.config && this.config.getNextConfigIndex) {
        let nextConfigIndex = undefined;
        if (this.config.getNextConfigIndex.constructor == Number) {
          nextConfigIndex = this.config.getNextConfigIndex;
        }
        if (this.config.getNextConfigIndex.constructor == Function) {
          // 获取下一个弹窗的配置下标
          nextConfigIndex = this.config.getNextConfigIndex({
            row,
            column: column.own,
            globalParam: this.currentReceiveParam.globalParam || {},
            allConfig: this.allConfig,
          });
        }
        if (nextConfigIndex !== undefined) {
          this.$dialogPanel.show(this.allConfig, nextConfigIndex, {
            row,
            column: column.own,
            globalParam: this.currentReceiveParam.globalParam || {},
          });
        }
      }
      //...
    },
```

##### 3. 表格列配置信息放在后台数据库

这里还有一个要点是将表格的列配置信息放在后台数据库一个配置表里面，然后渲染表格根据用户设置的 `talbe_columns_id` 取数据库读取表格配置。

这里就是简单的 `CRUD` 了。在`初次渲染表格`或者`重新渲染表格`时去请求后台数据库配置数据，得到配置信息再去渲染表格然后渲染数据。

这里不必深入。了解一下就可以了。

## 3. 网省资金APP

这里不太了解，你可以自己总结一下，移动端主要问题是一些性能问题，还有分辨率兼容问题。这个我记得是通过 `rem` 或者 `vw` 来解决，这个你去了解一下现在的解决方案，说一下应该就OK了。

