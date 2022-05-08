# 03 Omit

> medium

## 题目描述

不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}
type TodoPreview = MyOmit<Todo, 'description' | 'title'>
const todo: TodoPreview = {
  completed: false,
}
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

```

#### 实现

```ts
//使用 pick 和 exclude
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
//去除 T 中 K 的类型
type MyExclude<T, K> = T extends K ? never : T; 

type MyOmit2<T, K extends keyof T> = {
    [key in MyExclude<keyof T, K>]: T[key]
}

type MyOmit3<T, K extends keyof T> = {
    [key in keyof T as key extends K ? never : key]: T[key]
}
```
