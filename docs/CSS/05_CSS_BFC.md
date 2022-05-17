# CSS BFC 相关

## 定义

`BFC (block Formatting Context)` 块级格式化上下文

`BFC` 决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作，当涉及到可视化布局时，`Block Formatting Context` 提供了一个环境，`HTML`在这个环境中按照一定的规则进行布局。

## 如何触发 `BFC`

- 根元素 或者 包含他的元素
- 浮动 `float: left/right/inherit`
- 绝对定位元素 `position: absolute/fixed`
- 行内块 `display: inline-block`
- 表格单元格 `display: table-cell`
- 表格标题 `display: table-caption`
- 溢出元素 `overflow: hidden/scroll/auto/inherit`
- 弹性盒子 `display: flex`

## BFC 布局规则

- 内部的 `box` 会在垂直方向，一个接一个放置
- `box` 垂直方向的距离由`margin`决定。属于同一个`BFC`的两个相邻的`box`的`margin`会发生折叠。
- 每个元素的`margin`` box`的左边，与包含块`borderbox`的左边相接触（对于从左往右的格式化，否则相反）。即使存在浮动也是如此。
- `BFC`的区域不会和`float box`重叠。
- `BFC` 就是页面上的一个隔离的独立容器。容器里面的子元素不会影响到外面的元素。反之也是如此。
- 计算 `BFC` 高度时，浮动元素也参加计算。

## BFC 应用场景

### 1. 解决块级元素垂直方向margin重叠

```html
<style>
.box {
    width: 180px;
    height: 180px;
    background-color: rosybrown;
    color: #fff;
    margin: 60px auto;
}
</style>

<body>
    <div class="box">test</div>
    <div class="box">hahah</div>
</body>
```
上面的这个box 的margin-bottom 和 下面的这个 box margin-top 发生了重叠

![](/bfc/BFC-1.png)

这种情况下的margin边距为两者之间的最大值，而不是两者之间的和，那么我们可以使用BFC来解决margin重叠问题

```html
<style>
.box {
    width: 180px;
    height: 180px;
    background-color: rosybrown;
    color: #fff;
    margin: 60px auto;
}
.outer_box {
    overflow: hidden;
}
</style>

<body>
    <div class="box">test</div>
    <div class="outer_box">
        <div class="box">hahah</div>
    </div>
</body>
```
![](/bfc/bfc2.png)

### 2.解决浮动元素高度塌陷问题

```html
<style>
.box {
    float: left;
    width: 180px;
    height: 180px;
    background-color: rosybrown;
    color: #fff;
    margin: 60px;
}
.outter_box {
    background-color: lightblue;
}
</style>

<body>
    <div class="outter_box">
        <div class="box">test</div>
        <div class="box">haha</div>
    </div>
</body>
```
![](/bfc/bfc3.png)

这里因为`box`浮动导致 `otter_box` 容器高度为0了，背景颜色也没有出现。我们可以将`outter_box` 变为 `BFC`，高度也计算浮动元素高度。

```html
<style>
.box {
    float: left;
    width: 180px;
    height: 180px;
    background-color: rosybrown;
    color: #fff;
    margin: 60px;
}
.outter_box {
    background-color: lightblue;
    /*变为BFC*/
    display: inline-block;
}
</style>

<body>
    <div class="outter_box">
        <div class="box">test</div>
        <div class="box">haha</div>
    </div>
</body>
```
![](/bfc/bfc4.png)

### 3.清除浮动

```html
<style>
.aside {
    float: left;
    width: 180px;
    height: 180px;
    background-color: lightpink;
}
.container {
    width: 500px;
    height: 200px;
    background-color: mediumturquoise;
} 
</style>

<body>
    <div class="outer_box">
        <div class="aside">test</div>
        <div class="container">test</div>
    </div>
</body>
```
![](/bfc/bfc5.png)

因为`aside` `box` 的浮动， 导致 `container` 和 `aside` 元素区域重叠。我们可以将 `container` 变为 `BFC`，`BFC` 不与浮动元素重叠。

```html
<style>
.aside {
    float: left;
    width: 180px;
    height: 180px;
    background-color: lightpink;
}
.container {
    width: 500px;
    height: 200px;
    background-color: mediumturquoise;
    overflow: hidden;
} 
</style>

<body>
    <div class="outer_box">
        <div class="aside">test</div>
        <div class="container">test</div>
    </div>
</body>
```
![](/bfc/bfc6.png)