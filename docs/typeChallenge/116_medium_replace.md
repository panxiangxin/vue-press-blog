# 116 replace

> medium

## 题目描述

实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

例如

```ts
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]

type dd = Replace<'foobarbar', 'bar', 'foo'>
```

#### 实现

```ts
//复杂版
type Replace1<S extends string, From extends string, To extends string> = From extends ""
  ? S
  : S extends `${From}${infer Ohters}`
  ? `${To}${Ohters}`
  : S extends `${infer P1}${From}${infer P2}`
  ? `${P1}${To}${P2}`
  : S extends `${infer S1}${From}`
  ? `${S1}${To}`
  : S;

//简化
type Replace<S extends string, From extends string, To extends string> = From extends ""
  ? S
  : S extends `${infer P}${From}${infer R}`
  ? `${P}${To}${R}`
  : S;
```
