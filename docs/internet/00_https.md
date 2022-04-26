# HTTPS 协议

## 什么是`HTTPS`协议？为什么需要`HTTP`协议？和`HTTP`协议有什么区别？

### `HTTP` 协议缺陷

`HTTP`协议运用广泛，但是它存在不小的安全缺陷，主要是其数据的明文传输和消息完整性检测缺乏，一些比较注重安全的方式比如网络支付、网络交易、对这方面是最重视的。

- 1. 关于`HTTP`的明文传输，攻击者常用的就是网络嗅探。试图从传输过程中分析出敏感数据，例如管理员Web程序的登录过程等等，从而获取网站管理权限，进而渗透到整个服务器。
即使无法或者网站管理权限，攻击者也可以获取到用户信息等重要资料，造成严重安全事故。另外，进行网络嗅探攻击非常简单，使用网络上任意一款抓包工具，一个新手就可以获取一个大型网站信息。

- 2. `HTTP`在传输客户端请求和服务端响应时，唯一的数据完整性验证就是在报文头部包含了本次传输数据的长度，而对内容是否被篡改不做确认。因此攻击者可以轻易发起中间人攻击。修改客户端和服务端的传输数据，甚至植入木马。

### `HTTPS` 改进

`HTTP`就是`HTTP`加上`TLS/SSL`协议构建的可进行加密传输、身份认证的网络协议。主要通过数字证书、哈希散列算法、对称加密、非对称加密等技术实现互联网的加密传输。实现互联网传输保护。设计目标主要有三个：

- 1. 数据保密性 保证数据传输过程中不被第三个人看到。

- 2. 数据完整性 及时发现第三方篡改的内容。

- 3. 身份校验安全性 保证数据按照期望的到大目的地。


## 对称加密

### 过程

- 1.服务端有一个`k`,传输数据`data`通过`f(k,data)`进行数据加密得到`xx`,发送给客户端。

- 2.客户端也保存`k`,通过`f'(xx, k)`进行数据解密，获取数据`data`。

### 缺点

因为服务端不可能保存大量不相同的`k`,一般服务端的k都是相同的，而且客户端也持有k,所以黑客可以通过客户端获取这个`k`,从而拦截其他客户端的请求获取数据，设置篡改数据。

## 非对称加密

### 过程

- 1.服务端持有公钥`pk`、私钥`sk`, 发送给客户端`pk`。

- 2.客户端通过pk 加密数据 `data` 通过 `f(pk, data)` 加密得到 `data'` 传输给服务端

- 3.服务端通过私钥 进行`f'(sk, data')` 对数据进行解密 保证了客户端数据无法被黑客拦截获取。

### 缺点

上述过程是客户端向服务端发送数据，那如果是服务端向客户端发送数据通过sk私钥加密， 客户端通过`pk` 解密，但是公钥`pk`是所有客户端都可以获取的。

这样黑客就可以拦截服务端发送给其他客户端数据通过pk进行解密。

## 非对称加密 + 对称加密

### 过程

- 1.服务端持有公钥 `pk` , 私钥 `sk`

- 2.服务端发送公钥 `pk` 给客户端

- 3.客户端随机生成一个对称加密加密值`k` 通过 `pk` 加密传输 `k'` 给 服务端

- 4.服务端使用 `sk` 进行 `k'` 解密 获取到加密值 `k` ,之后双方就可以通过这个`k`值进行对称加密通信

### 缺点

使用非对称加密传输`k`的过程，黑客获取到非对称加密数据 `k'` 也无法解密，只有私钥 `sk` 才能解密。所以 `k` 值是安全的。

但是，如果黑客从第一步直接开始拦截双方数据呢？

- 1. 黑客拦截客户端请求 黑客也拥有自己的 `pk'` 、`sk'` 然后向服务端发送请求得到服务端 `pk` 之后 将自己的 `pk'` 发送给客户端

- 2. 客户端发送随机`k`值 黑客拦截 将自己的`k'` 值发送给服务端 双方都不知道有黑客这个中间人的存在

- 3. 之后黑客可以随意获取双方的通信数据 甚至进行数据篡改

## HTTPS 加密通讯原理

我们考虑一下非对称加密 + 对称加密 不安全的关键在哪？

是第一步我们接收到服务器的公钥 `pk` ,无法确定是否是真正的服气器发送的 `pk` ,是否被替换和篡改。

所以，这里就引进了第三方的权威认证， *CA（Certification Authority）*；

现在我们的验证过程如下

- 1. 服务器拥有 `pk` 、`sk`, CA提供商拥有 `cpk` 、`csk`。
- 2. 服务器提供商向CA机构申请证书，`CA` 通过 `csk` 对 服务器 `pk` 进行加密 得到 `license`。
- 3. 客户端向服务端请求证书，服务端发送 `license`.
- 4. 客户端获得 `license` 通过本地计算机系统内部 或者 浏览器内部预留的的 `CA` 机构的 `cpk` 进行对证书解密。判断证书是否合法。这里操作系统和浏览器内部都会预装 `CA` 证书。
- 5. 证书正确之后，通过`cpk` 解密得到服务器 公钥 `pk`。 之后 客户端随机生成 对称加密 `k` 获得 `k'` 通过 公钥传输。
- 6. 之后服务端 使用私钥 `sk` 对 `k'` 解密 得到 `k` 之后双方 就可以通过 `k` 进行数据加密通信。

这里客户端和服务端商量生成 `k` 这里其实没有这么简单，也是有以下几个步骤：

- 1. c -> s 客户端发送请求 `SSL` 版本、支持非对称加密的算法、随机数`num1`.
- 2. s -> c 服务端接收数据，决定使用的非对称加密算法和SSL版本，发送随机数`num2`、`license`.
- 3. c 客户端验证证书 正确后方可进行之后操作
- 4. c -> s 证书验证正确之后， 客户端发送 使用的`哈希散列算法`、`num3` ,和对`一二步结果`的 `hash` 得出数据 `xx`.
- 5. s 服务器接收数据 使用本地的一二步结果 `hash` 出的结果 和 `xx` 对比，验证正确为客户端发送， 使用算法对`num1`, `num2`, `num3`运算得出`k`.
- 6. s -> c 服务端 对` 一、二、四 步结果`进行 `hash` 得到 `zz` 发送给 客户端
- 7. c 客户端 对本地一二四步结果进行`hash` 和 `zz` 对比验证正确，通过相同算法对`num1,num2,num3` 运算得出 `k` .
- 8. 因为`k`没有在信道上进行传输、都在本地生成 是安全的。 