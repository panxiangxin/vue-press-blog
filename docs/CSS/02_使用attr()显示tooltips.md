# 使用 attr()显示 tooltips

![](http://pxxmawen.cn-bj.ufileos.com/myblog/QQ20220430-110133-HD.gif)

# 原理

`attr()` 属性工作的方式很简单，我逐步解析一下：

-   我们使用 `tooltip` `class` 去标志哪个元素需要展示 `tooltip` 信息。然后为该元素添加你喜欢的样式，这个方便演示，我们使用了 `dotted` `border-bottom` 的样式。
    接下来，我们创建一个 `::before` 伪元素，它将包含内容 `content`，指向特定的 `attr()`。这里指 `attr(tooltip-data)`。
-   接着，我们会创建一个 `:hover` 伪类，当用户鼠标移动道元素上时，它将设置 `opacity` 为 1。

此外，你可以包含自定义的样式。这取决于你设定的 `tooltip` 的数据，你也许需要调整其宽度或者边距。一旦你设定了 `tooptip-data attr()` 类，你可以在你设计的其他部分应用。

# 代码

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>

        <style>
            body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
            }

            .tooltip {
                position: relative;
                border-bottom: 1px dotted black;
            }

            .tooltip::before {
                content: attr(tooltip-data);
                position: absolute;
                width: 250px;
                background-color: #000;
                color: #fff;
                text-align: center;
                padding: 15px;
                border-radius: 5px;
                z-index: 1;
                opacity: 0;
                bottom: 125%;
                left: 50%;
                margin-left: -60px;
                font-size: 0.7em;
                visibility: hidden;
                transition: opacity 0.5s;
            }

            .tooltip::after {
                content: '';
                position: absolute;
                bottom: 82%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                opacity: 0;
                transition: opacity 0.5s;
                border-color: #000 transparent transparent transparent;
                visibility: hidden;
            }

            .tooltip:hover::before,
            .tooltip:hover::after {
                opacity: 1;
                visibility: visible;
            }
        </style>
    </head>

    <body>
        <p>Hover <span class="tooltip" tooltip-data="Tooltip Content">Here</span> to see the tooltip.</p>

        <p>You can also hover <span class="tooltip" tooltip-data="This is another Tooltip Content">here</span> to see antoher example.</p>
    </body>
</html>
```
