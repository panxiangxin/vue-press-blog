# 15 last

> medium

## 题目描述


实现一个通用`Last<T>`，它接受一个数组`T`并返回其最后一个元素的类型。

例如

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]
type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]
```

#### 实现

```ts
type Last<T extends any[]> = T extends [...infer _K, infer R] ? R : never;
```
