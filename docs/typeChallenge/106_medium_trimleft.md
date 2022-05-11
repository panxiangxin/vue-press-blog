# 106 trimleft

> medium

## 题目描述

实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

例如

```ts
type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]
```

#### 实现

```ts
type trims = ' ' | '\t' | '\n'
type TrimLeft<S extends string> = S extends `${trims}${infer L}` ? TrimLeft<L> : S
```
