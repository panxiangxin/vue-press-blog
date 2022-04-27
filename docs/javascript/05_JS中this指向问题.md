# JS中this指向问题

## this指什么？

这是一个很重要的问题， 平常一般我们可能会用，但是具体说明this是什么，可能就语塞了。

```
this指包含它的函数作为方法被调用时所属的对象。
```

这句话有三个重点：

- 1. 包含它的函数
- 2. 作为方法被调用
- 3. 所属的对象

举个例子

```js
function showName() {
    console.log(this.name); //window.name
} 
showName();
```
首先`this`被`showName`包含了，然后`showName`调用，这个时候被谁调用了呢？很明显被全局的`window`调用了，相当于`window.showName()`; 所以这里的`this`就是指`window`.

## 1.默认绑定

默认绑定就是不满足其他调用，比如说函数独立调用this非全局调用就默认是全局window,严格模式下是undefined.

```js

var num = 0;

function inc() {
    var num = 1;
    this.num++;
    console.log(this.num);
}

foo() // 输出：1

```

## 2.隐式调用

函数调用位置有上下文，或者该函数的引用地址是不是被某个对象的属性引用，并通过对象的属性调用直接运行该函数。如果出现这情况，就会触发`this`的隐式绑定,`this`就会绑定当前调用对象。

```js
function foo() {
    console.log(this.name);
}

var bar = {
    name: 'shify',
    foo: foo
}

bar.foo(); //输出：shify

```
但是隐式调用会出现`this`指向丢失的情况

```js
var name = 'widny';

function foo() {
    console.log(this.name);
}

var bar = {
    name: 'shify',
    foo: foo
}

var foo1 = bar.foo;

foo1() //输出：windy

```

要需要补充一点，不管你的对象嵌套多深，`this`只会绑定为直接引用该函数的地址属性的对象

```js
function foo() {
    console.log(this.name);
}

var test = {
    name: 'test',
    bar: bar
}

var bar = {
    name: 'shify',
    foo: foo
}

test.bar.foo();  //输出： shify

```
## 3.显示调用 apply、call、bind 方法

`javascript`,在`Function`的`prototype`上提供了3个方法来强行修改`this`，分别是 `call`、`apply`、`bind`，大家经常用的莫过于`call`和`apply`了，这两个函数的第一个参数，都是需要执行函数绑定的`this`，对于`apply`只有连个参数，第二个参数是一个数组，这个数组是要传入执行函数的参数，而`call`可以跟很多参数，从第二个参数起都会被传入到要执行函数的参数中。

```js
function foo() {
   console.log(this.age)
}

var shiny = {
   age: 20
}

foo.call(shiny)//20

function bar(){
console.log(this.age)
}

var red = {
age: 18
}

bar.apply(red)//18
```

硬绑定 bind

通过`apply` 和 `闭包` 实现`bind`方法，实现强绑定规则，并且经过`bind`之后，`apply`,`call`无法改变`this`指向。

```js
function foo(b){
  return this.a + b
}

var obj = {
  a: 2
}

function bind(fn,obj){
  return function(){
     return fn.apply(obj,arguments)
  }
}
bind(foo,obj)(3)//5
```
## 4.new 绑定

我们首先了解一下js中 new 的创建对象过程

- 1. 创造一个全新的对象
- 2. 将这个对象的__proto__属性指向构造函数的prototype。
- 3. 将这个对象绑定到构造函数this执行函数
- 4. 判断构造函数返回结果是否是一个对象 不是的话返回这个上面的新对象， 是一个对象则直接返回该对象

```js
function myNew(fn) {
    var args = Array.prototype.slice.apply(arguments, 1);
    let obj = {};
    obj.__proto__ = Object.create(fn.prototype);
    let res = fn.apply(obj, args);

    return typeof res === 'object' ? res : obj;
}

```
是否大于`bind`呢？代码测试一下。

```js
var function foo() {
    console.log(this.name);
}
var shify = {
    name: 'shify';
}

var bar = foo.bind(shify);
var obj = new foo();

console.log(obj.name); //undefined
```
所以new 的优先级是高于`apply`,`call` `bind`显示调用的。

## 5.箭头函数this

箭头函数是没有`this`的，不能使用`apply`,`call`,`bind` 所以箭头函数是不能作为构造函数使用的，也没有`arguments`对象，箭头函数也没有`prototype`属性。

箭头函数的`this`取决于外层作用域的`this`。如果没有那就是`window`.

```js
var name = 'widow';

var obj = {
    name: 'obj',
    foo: foo
}

function foo() {
    
    return () => {
        console.log(this.name);
    }    
}

let bar = obj.foo();
bar(); //输出obj 这里this指向在obj.foo就确定了
```