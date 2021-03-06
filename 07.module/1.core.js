/*
** 核心模块 fs path
*/

const fs = require('fs');
const path = require('path');

// fs 所有的方法基本上都是同步方法、异步方法
// 同步：如果刚刚运行程序，需要拿到结果，可以去使用同步的方法
// 异步：开启一个服务监听客户端访问，Node单线程，就需要使用异步了，因为异步是非阻塞的 

// 操作文件时 尽量使用"绝对路径"来进行操作
// 获取当前的目录 process.cwd() 可变的（在哪执行，这个目录就是哪）  __dirname 不可变的（当前文件所在文件夹）


// __dirname 代表的是当前文件所在的文件夹，__dirname并不属于global，每个模块独有的

// 当前文件夹路径 拼接 ./name.txt
// resolve，解析路径，遇到/ 会回到根目录
console.log(path.resolve(__dirname,'./name.txt','./')); // resolve不能遇到/，非要接/得加点
console.log(path.join(__dirname,'./name.txt','./')); // 拼接
console.log(path.extname('a/b/a.min.js')); // 获取当前路径的扩展名


// 1.同步 判断文件是否存在
const exists = fs.existsSync(path.resolve(__dirname,'..','name.txt'));
// 2.同步 的读取文件
const r = fs.readFileSync(path.resolve(__dirname,'..','name.txt'),'utf8');


/*
** 核心模块 vm 
*/


// 虚拟机模块 (沙箱) 干净的环境  测试用例
// 内部一般情况下操作的都是字符串逻辑，字符串变成JS，如何让一个字符串来运行  `console.log(1)`

// 方式1： eval()，eval默认会取当前的作用域下的变量，不干净的环境 eval()
const a = 100;
eval(`console.log(1)`) // 沙箱环境意思只运行这一行代码，应该取不到a的值，但是eval默认会取当前的作用域下的变量

// 方式2：可以使用new Function 来创建一个沙箱环境，让字符串执行
const a = 100;
let fn = new Function('c','b','d',`console.log(a)`); // 返回一个匿名函数，执行
console.log(fn()); // 不传a，也不会默认找a，undefined

console.log(fn.toString()) 
// 打印：function anonymous(c, b, d){console.log(a)}


/*
** 模板引擎的实现原理 with语法 + 字符串拼接 + new Function来实现
** 2.template.js  test.js
*/


/*
** 虚拟机模块 可以创建沙箱环境
*/
const vm = require('vm'); 
vm.runInThisContext(`console.log(a)`); // a undefined 并没有向上查找，是一个干净的环境
// 和eval非常像，但是不会查找上级作用域


