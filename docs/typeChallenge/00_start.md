# 搭建Type-Challenges 本地环境

`TypeScript` 是`JavaScript`的超集，给`JavaScript`添加了静态类型检查 和 `interface`、`enum`等语法。 为了更好的了解`TypeScript`类型编程。
`Github` 上有一个 `Type-Challenge`仓库里面有很多类型编程试题。可以有时间刷一刷，刷会了这些，对平常工作中用到`TypeScript`将更加得心应手。

`Github`地址: [type-challenges](https://github.com/type-challenges/type-challenges)

## 初始化TS项目

这里很简单，创建一个项目文件夹，用`npm init`初始化即可。下面是我这里的项目。

![项目目录](/ts-00.png)

这里 `challenges` 文件夹是用来放题目和练习的文件夹。

## hello world

`ts` 项目搭建完之后，开始 `hello-world` 第一个Demo走流程。

找到第一个`warm up` 下面的 `hello world`

![仓库地址](/ts-01.png)

点击`hello world `

![hello world](/ts-02.png)

注意这上面有`README.zh-CN.md`,`template.ts`,`test-cases.ts`, 我们同样在 `challenges` 创建 `hello-world` 文件夹，里面同样包含这三个文件。内容直接复制。

![ts-hello world](/ts-03.png)

复制完之后，打开`test-cases.ts`文件，发现飘红，提示没有引用相应的`types`声明，这里我们`npm` 安装一下 对应的`types`文件。

```sh
pnpm i @type-challenges/utils
```

`types` 下载完毕。这里就可以正式开始做题了。

从`hello world` 题意可知 `HelloWorld` 类型是 `string`。 我们将 `template.ts` 中的 `HelloWorld` 改为 `string` 就好了。`test-cases.ts`就不报错了。`test-cases.ts` 没有错误报出就意味着我们`template.ts`的答案是正确的。

这里一个做题的流程就结束了。我们做其他题目，也就是上面`hello-world`的流程。

## hygen

这里我们每次做题都要生成对应的文件夹和文件，所以我们可以用hygen工具来给我们自动生成文件模板。

### 1. 安装

[hygen安装使用教程](https://blog.csdn.net/qq_38506368/article/details/119057853)

### 2. 我的模板

```sh
# 生成模板
hygen generator new codes 
# 生成命令行交互
hygen generator with-prompt codes    
```
![模板目录](/ts-04.png)

`README.ejs.t`

```
---
to: challenges/<%= questions %>/README.md
---

```
`template.ejs.t`

```
---
to: challenges/<%= questions %>/template.ts
---

```
`test-cases.ejs.t`

```
---
to: challenges/<%= questions %>/test-cases.ts
---
```
`with-prompt.js`

```js
// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
module.exports = [{
  type: 'input',
  name: 'questions',
  message: "TS 类型练习题目?",
  validate(value) {
    if (!value.length) {
      return '题目名称不能为空！'
    }
    return true
  }
}]
```

最后在`package.json`里面 添加 `practice` 快捷命令简化操作

```json
"practice": "hygen codes with-prompt"
```

OK 大功告成。之后我们就可以通过`npm run practice`创建模板文件,然后只需要更改对应文件内容就好了, 在`template.ts` 做题， 在`test-cases.ts`里面测试结果。