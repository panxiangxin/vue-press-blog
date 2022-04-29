# Typing 动画实现

利用 CSS 实现一个简单的`Typing`动画

![](http://pxxmawen.cn-bj.ufileos.com/myblog/QQ20220429-184759-HD.gif)

## 原理

利用 CSS`animation`关键帧动画`@keyframes`,我们通过`step()`这个属性去分割文本展示效果，`step()`中的长度就是文本的长度。

> 如果你在 I am Typing! 后面增加文字，而不改变 `step()`中大小，将得不到想要的效果。

## 代码实现

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Typing 打字动画</title>

        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
            }

            .text {
                width: 18ch;
                overflow: hidden;
                white-space: nowrap;
                font-family: monospace;
                border-right: 1px solid;
                font-size: 2em;
                animation: typing 2s steps(18), effect 0.5s step-end infinite alternate;
            }

            @keyframes typing {
                0% {
                    width: 0;
                }
            }

            @keyframes effect {
                50% {
                    border-color: transparent;
                }
            }
        </style>
    </head>

    <body>
        <div class="text">Hello I am Typing!</div>
    </body>
</html>
```
