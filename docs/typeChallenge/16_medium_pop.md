# 16 pop

> medium

## 题目描述

实现一个通用`Pop<T>`，它接受一个数组`T`并返回一个没有最后一个元素的数组。

例如

```ts
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]
type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
```
**额外**：同样，您也可以实现`Shift`，`Push`和`Unshift`吗？

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd' ]>, ['a', 'b', 'c']>>,
]
```

#### 实现

```ts
type Pop<T extends any[]> = T extends [...infer K, infer _R] ?  K : never
type Shift<T extends any[]> = T extends [infer K, ...infer _R] ? K : never
type Push1<T extends any[], V> = [...T, V]
type Unshift1<T extends any[], V> = [V, ...T]
```
