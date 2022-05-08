# 3037 push

> easy!

## 题目描述

在类型系统里实现通用的 `Array.push` 。

举例如下，

```typescript
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [Expect<Equal<Push<[], 1>, [1]>>, Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>, Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>]

type dd = Push<['1', 2, '3'], boolean>
```

#### 实现

```ts
// type Push<T extends unknown[], U> = U extends unknown[] ? [...T, ...U] : [...T, U]

type Push<T extends unknown[], U> = [...T, U]
```
