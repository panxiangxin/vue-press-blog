# 14 first

> easy!

## 题目描述

实现一个通用`First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]
type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [Expect<Equal<First<[3, 2, 1]>, 3>>, Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>, Expect<Equal<First<[]>, never>>, Expect<Equal<First<[undefined]>, undefined>>]

type errors = [
    // @ts-expect-error
    First<'notArray'>,
    // @ts-expect-error
    First<{ 0: 'arrayLike' }>
]
```

#### 实现

```ts
type First<T extends any[]> = T extends [] ? never : T[0]

// type First<T extends any[]> = T extends [infer P, ...infer K] ? P : never;
```
