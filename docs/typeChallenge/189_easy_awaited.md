# 189 awaited

> easy!

## 题目描述

假如我们有一个`Promise`对象，这个`Promise`对象会返回一个类型。在`TS`中，我们用`Promise<T>`中的`T`来描述这个`Promise`返回的类型。请你实现一个类型，可以获取这个类型。

比如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>

type cases = [Expect<Equal<MyAwaited<X>, string>>, Expect<Equal<MyAwaited<Y>, { field: number }>>, Expect<Equal<MyAwaited<Z>, string | number>>]

// @ts-expect-error
type error = MyAwaited<number>
```

#### 实现

```ts
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer R> ? (R extends Promise<unknown> ? MyAwaited<R> : R) : never
```
