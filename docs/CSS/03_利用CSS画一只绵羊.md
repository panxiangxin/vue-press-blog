# 用CSS画一只绵羊

## 效果

![](/css/my.png)

## 实现

`HTML` 文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./index.css">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <!-- 腿 -->
        <div class="legs"></div>
        <!-- 身体部分 -->
        <div class="body">
            <div class="face">
                <div class="ears"></div>
                <div class="eyes"></div>
                <div class="nose"></div>
            </div>
        </div>
        <!-- 底部区域 -->
        <div class="shadow"></div>
    </div>
</body>
</html>
```

`CSS` 文件

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    width: 100%;
    height: 100vh;
    background-color: #f5c306;
}

.container {
    height: 500px;
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.body {
    height: 240px;
    width: 240px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 100px;
}

.body:before {
    content: "";
    position: absolute;
    width: 75.5px;
    height: 75.5px;
    border-radius: 50%;
    background-color: #fff;
    left: 80px;
    top: -25px;
    box-shadow: 0 215px #fff, 107px 107px #fff, -107px 107px #fff,
    -50px 15px #fff, 50px 15px #fff, -88px 50px #fff, 88px 50px #fff,
    -50px 200px #fff, 50px 200px #fff, -88px 160px #fff, 88px 160px #fff
    ;
}

.face {
    background-color: #505050;
    width: 80px;
    height: 100px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 70px;
    border-radius: 30px;
}

.ears {
    position: absolute;
    background-color: #303030;
    height: 50px;
    width: 50px;
    border-radius: 45px 0;
    top: 0;
    left: -40px;
}
.ears::before {
    position: absolute;
    content: "";
    background-color: #303030;
    height: 50px;
    width: 50px;
    border-radius: 0 45px;
    top: 0;
    left: 110px;
}

.eyes {
    position: absolute;
    background-color: #252525;
    height: 10px;
    width: 10px;
    left: 10px;
    top: 5px;
    border-radius: 50%;
    box-shadow: 0 0 0 15px #fff, 0 0 0 20px #505050;
}

.eyes::before {
    position: absolute;
    content: "";
    background-color: #252525;
    height: 10px;
    width: 10px;
    left: 47px;
    border-radius: 50%;
    box-shadow: 0 0 0 15px #fff, 0 0 0 20px #505050;
}

.nose {
    position: absolute;
    background-color: #404040;
    height: 10px;
    width: 16px;
    top: 60px;
    left: 32px;
    border-radius: 3px 3px 0 0;
    border-bottom: 3.5px solid #252525;
}

.nose::before {
    content: "";
    position: absolute;
    background-color: #252525;
    height: 6px;
    width: 3.5px;
    left: 6.5px;
    top: 10px;
}

.legs {
    position: absolute;
    background-color: #505050;
    height: 80px;
    width: 20px;
    left: 180px;
    top: 310px;
    box-shadow: 110px 0 #505050;
}

.shadow {
    width: 250px;
    height: 5px;
    background-color: rgb(61,49,0, 0.15);
    position: absolute;
    top: 390px;
    margin: auto;
    left: 0;
    right: 0;
    border-radius: 5px;
}
```