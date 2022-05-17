# 531 stringToUnion

> medium

## 题目描述

实现一个将接收到的String参数转换为一个字母Union的类型。

例如

```ts
type Test = '123';
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
```

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]
```

#### 实现

```ts
type StringToUnion<T extends string> = T extends `${infer R}${infer U}` ? R | StringToUnion<U> : never
```
