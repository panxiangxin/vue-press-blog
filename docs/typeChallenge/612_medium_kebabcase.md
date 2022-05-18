# 612 kebabcase

> medium

## 题目描述

FooBarBaz -> foo-bar-baz

## 测试用例

```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]
```

#### 实现

```ts
type KebabCase<S> = S extends `${infer Head}${infer Tail}` 
? `${Lowercase<Head>}${Tail extends Uncapitalize<Tail> 
    ? '' 
    : '-'}${KebabCase<Tail>}` 
: S;
```
