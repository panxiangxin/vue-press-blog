# 298 length_of_string

> medium

## 题目描述

计算字符串的长度，类似于 `String#length` 。

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [Expect<Equal<LengthOfString<''>, 0>>, Expect<Equal<LengthOfString<'kumiko'>, 6>>, Expect<Equal<LengthOfString<'reina'>, 5>>, Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>]
```

#### 实现

```ts
type LengthOfString<S extends string, K extends string[] = []> = S extends `` ? K['length'] : S extends `${infer F}${infer U}` ? LengthOfString<U, [...K, F]> : K['length']
```
