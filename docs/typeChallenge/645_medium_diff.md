# 645 diff

> medium

## 题目描述

获取两个接口类型中的差值属性。

```ts
type Foo = {
  a: string;
  b: number;
}
type Bar = {
  a: string;
  c: boolean
}
type Result1 = Diff<Foo,Bar> // { b: number, c: boolean }
type Result2 = Diff<Bar,Foo> // { b: number, c: boolean }
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff1<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff1<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff1<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff1<Coo, Foo>, { age: string; gender: number }>>,
]
```

#### 实现

```ts
type Diff1<O, O1> = {
    [key in Diffs<O, O1>]: key extends keyof O ? O[key] : key extends keyof O1 ? O1[key] : never
}

type Diffs<A, B> = Exclude<keyof A, keyof B> | Exclude<keyof B, keyof A>
```
