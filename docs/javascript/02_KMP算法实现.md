# KMP 算法实现

## 原理

[CSDN 博客链接](https://blog.csdn.net/Roger__King/article/details/15966409)

## 代码

### 1.求取 next 表数组

```javascript
function getNext(pattern) {
    let next = new Array(pattern.length).fill(0)
    let k = -1
    let j = 0
    next[0] = -1
    while (j < pattern.length - 1) {
        //p[k]表示前缀，p[j]表示后缀
        if (k == -1 || pattern[k] == pattern[j]) {
            k++
            j++
            //因为不能出现p[j] = p[ next[j ]]，所以当出现时需要继续递归，k = next[k] = next[next[k]]
            if (pattern[k] != pattern[j]) {
                next[j] = k
            } else {
                next[j] = next[k]
            }
        } else {
            k = next[k]
        }
    }

    return next
}
```

### 2. KMP

```javascript
function KMP(target, parttern) {
    let i = 0,
        j = 0
    let next = getNext(parttern)

    while (i < target.length && j < parttern.length) {
        //①如果j = -1，或者当前字符匹配成功（即target[i] == parttern[j]），都令i++，j++
        if (j == -1 || target[i] == parttern[j]) {
            i++
            j++
        } else {
            //②如果j != -1，且当前字符匹配失败（即target[i] != parttern[j]），则令 i 不变，j = next[j]
            //next[j]即为j所对应的next值
            j = next[j]
        }
    }

    if (j == parttern.length) {
        return i - j
    }

    return -1
}
```
