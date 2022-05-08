# 268 if

> easy!

## 题目描述

实现一个 `IF` 类型，它接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 `true` 或者 `false`， `T` 和 `F` 可以是任意类型。

举例:

```ts
type A = If<true, 'a', 'b'> // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [Expect<Equal<If<true, 'a', 'b'>, 'a'>>, Expect<Equal<If<false, 'a', 2>, 2>>]

// @ts-expect-error
type error = If<null, 'a', 'b'>
```

#### 实现

```ts
type If<C extends boolean, T, F> = C extends true ? T : F
```
