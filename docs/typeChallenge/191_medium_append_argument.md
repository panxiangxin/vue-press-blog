# 191 append_argument

> medium

## 题目描述

实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

```typescript
type Fn = (a: number, b: string) => number
type Result = AppendArgument<Fn, boolean>
// 期望是 (a: number, b: string, x: boolean) => number
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [Expect<Equal<Case1, Result1>>, Expect<Equal<Case2, Result2>>]
```

#### 实现

```ts
type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (...args: infer G) => infer R ? (...args: [...G, A]) => R : never
```
