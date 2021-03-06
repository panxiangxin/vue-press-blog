# 533 concat

> easy!

## 题目描述

在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

举例，

```ts
type Result = Concat<[1], [2]> // expected to be [1, 2]
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Concat<[], []>, []>>,
    Expect<Equal<Concat<[], [1]>, [1]>>,
    Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>
]
```

#### 实现

```ts
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U]
```
