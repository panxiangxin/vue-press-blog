# 3060 unshift

> easy!

## 题目描述

实现类型版本的 `Array.unshift`。

举例，

```typescript
type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [Expect<Equal<Unshift<[], 1>, [1]>>, Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>, Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>]
```

#### 实现

```ts
type Unshift<T extends unknown[], U> = [U, ...T]
```
