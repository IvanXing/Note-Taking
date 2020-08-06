## 一.函数相关的
- 高阶函数，发布订阅模式（解耦），观察者模式 （vue）

vue里面 数据会依赖很多watcher，当数据变化后，自动触发自己身上的注册的观察者

### 作业
作业：实现函数柯里化，反柯里化，防抖和节流 （把他们放在一起来实现？）lodash

## 二.Promise相关的  **重点**
- 掌握Promise实现原理
- Promise中 all，race,finally,promisify实现原理  then的特点
- co库的实现原理及generator的应用  异步迭代
- setTimeout、Promise、Async/Await（解析的结果） 的区别

### 作业
> 实现一个批量请求函数 multiRequest(urls,maxNum)

- 最大并发数 maxNum
- 每当有一个请求返回，就留下一个空位,可以增加新的请求
- 所有请求完成后，结果按照urls里面的顺序依次打出

> 异步解决方案的发展历程以及优缺点。 (promise的优缺点)

> 使用promise.all进行5个请求，若其中1个返回失败，怎么让其他4个可以成功返回

## 三.浏览器中的EventLoop和Node中的EventLoop
- EventLoop事件循环 (浏览器的事件环) NodeJS事件循环机制  （怎么划分队列的）
- 哪些是宏任务和微任务  (宿主环境提供的方法都是宏任务)  mutationObserver promise）

## 四.node核心
- NodeJS优缺点及应用场景，node核心有哪些内置类库？  cpu密集 、io密集
- NodeJS 是单线程还是多线程，都有哪些线程，JS 为什么是单线程的? process.nextTick()作用
- nodejs高并发怎么理解？为什么不适合运算量大的操作？

## 五.模块
- 模板引擎的实现原理 ejs的实现  (模板引擎的实现原理  with + new Function)
- 介绍模块化发展历程 （requirejs  seajs  es6module  commonjs规范 umd） 模块化的好处和有点  vite es6module

- require的解析规则? (require文件 怎么去查找的)
- CommonJS的实现原理?


## 六.EventEmitter  *** 发布订阅模式
- 掌握 on、emit、off、once的实现原理 (newListener)

## 七.NPM掌握常见命令
- 下载 安装 全部包的配置 发布 版本管理

## 八.Buffer  （操作的文件类型都是buffer）
- 说一下nodejs里对Buffer数据类型的认识，对于初始化的Buffer，可以实现增加长度吗?
- Buffer.from()  Buffer.alloc()  Buffer.isBuffer Buffer.concat()

### 作业:
> 手写二进制转Base64 （通用方法） 3*8 = 4*6

## 九.fs模块  （自己过一遍api）
- 掌握内部的api fs.readFile writeFile access stat ...... (open,write,read)
- 需要掌握两种常见的数据结构 链表和树结构 （反转） 链表如何遍历  树如何遍历（4必须能写出来）

### 作业: 
> 实现一个对象的深拷贝功能  ？ 不是递归版本 （树的遍历）

## 十.流  (多个异步嵌套的情况 如何解耦合 发布订阅点  promise有异曲同工之妙)
(多个异步并发如何处理 队列) 为什么要有流
- request response on('data') on('end') /  write  end  / pipe方法 
- NodeJS 中存在哪些流，怎么理解 pipe() 及其优点

- 可读流 可写流 转化流 zlib.createGzip() 双工流sokect

## 十一.http  认清头的作用    1 2 3 4 5 
- 请求方法，常见的header的使用，及状态码的应用
- 解决跨域的方案有哪些  （*跨域的方案*，你平时用哪些）
- 表单是否可以跨域 （危险） (xss csrf 公开课视频里讲过) 
- 304 强制缓存和对比缓存 （服务端）、gzip压缩实现 （gzip deflate）
- 301 和 302 对于 seo的优化


### 作业: （七层协议） http应用层面 浏览器缓存 浏览器渲染原理
> 当一个地址从输入到展示在浏览器中有哪些步骤

## 十二.Koa
- 掌握“上下文"的实现和”中间件实现“原理

### 作业:
> 实现compose函数 koa 怎么用reduce实现compose  
> Vue beforeEach（（next）=>{}）

