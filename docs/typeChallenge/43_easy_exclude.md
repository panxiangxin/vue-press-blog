# 43 exclude

> easy!

## 题目描述

实现内置的 Exclude <T, U>类型，但不能直接使用它本身。

> 从联合类型 T 中排除 U 的类型成员，来构造一个新的类型。

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, Exclude<'a' | 'b' | 'c', 'a'>>>,
    Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, Exclude<'a' | 'b' | 'c', 'a' | 'b'>>>,
    Expect<Equal<MyExclude<string | number | (() => void), Function>, Exclude<string | number | (() => void), Function>>>
]
```

#### 实现

```ts
type MyExclude<T, U> = T extends U ? never : T
```
