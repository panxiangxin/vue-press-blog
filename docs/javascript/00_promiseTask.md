# 一个简单的 Promise Task 实现

## 目标要求

实现一个简单的 `Promise Task` 任务队列，可以自定义设置最大并发任务数量，超过最大并发数量的 `Task` 只能等到现在已有的 `Task` 执行完才能执行。

```javascript
//参考代码
class PromiseTask {
    constructor(max) {}

    add(task) {}

    run() {}
}
//生成异步请求函数
function createTask(i) {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(i)
            }, 2000)
        })
    }
}

let task = new PromiseTask(10)

for (let i = 1; i <= 20; i++) {
    task.add(createTask(i))
}
// 输出结果 2秒后： 1，2，3，4，5，6，7，8，9，10
//        4秒后： 11，12，13，14，15，16，17，18，19，20
```

## 思路

-   1. 首先考虑到先进先出的特性，JS 实现可以使用数组实现。初始化一个数组存储这些异步任务。
-   2. 添加任务就是往队列里面添加当前异步任务。
-   3. 当执行 `run` 方法时，判断当前任务数量和最大并发数量的大小，取最小值为 `min`。从数组中头部开始执行 `min` 数量的任务。每个异步任务执行时将 `max` 值减一，执行成功或者失败将 `max` 值加一，之后也得调用 `run` 方法，通知可以执行下一个任务。
-   4. 可以在构造函数里面利用 `setTimeout` 往事件循环队列里面放一个 `run` 方法执行，可以等到 `task` 同步添加完之后自动开始执行任务。

## 代码实现

```javascript
class PromiseTask {
    constructor(max) {
        this.max = max
        this.tasks = []

        setTimeout(() => {
            this.run()
        })
    }

    add(task) {
        this.tasks.push(task)
    }

    run() {
        let len = this.tasks.length
        //取len 和 max最小值
        let min = Math.min(this.max, len)

        for (let i = 0; i < min; i++) {
            let task = this.tasks.shift()
            this.max--
            task()
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally((res) => {
                    this.max++
                    this.run()
                })
        }
    }
}
```

## 优化

以上代码只能自动执行第一次一次添加的同步任务，如果遇到下面异步添加任务则不会主动执行，这里我们可以在 `add` 方法里面 利用 `setTimeout` 延时调用一下 `run` 方法，为了节省资源，这里我们可以利用函数防抖处理一下，等任务全部添加完之后才开始执行任务。

### 代码实现

```javascript
class PromiseTask {
    constructor() {
        this.tasks = []
        this.max = 10
        //利用防抖函数 只执行最后一次add函数的run方法
        this.timer = null
    }

    add(tasks) {
        this.tasks.push(tasks)
        //防抖
        if (this.timer) {
            clearTimeout(this.timer)
        }

        this.timer = setTimeout(() => {
            this.run()
            this.timer = null
        })
    }

    run() {
        let len = this.tasks.length
        //取len 和 max最小值
        let min = Math.min(this.max, len)

        for (let i = 0; i < min; i++) {
            let task = this.tasks.shift()
            this.max--
            task()
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally((res) => {
                    this.max++
                    this.run()
                })
        }
    }
}
```
