# 459 flatten

> medium

## 题目描述

在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

例如:

```ts
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Flatten<[]>, []>>,
    Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
    Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
    Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>
]
```

#### 实现

```ts
type Flatten<K extends any[], T extends any[] = []> = K extends [infer P, ...infer R] ? (P extends any[] ? Flatten<[...P, ...R], T> : Flatten<R, [...T, P]>) : T
```
