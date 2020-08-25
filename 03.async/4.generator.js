//generator生成器 =生成=> 遍历器(遍历器对象需要有一个next方法，遍历时不停调用next直到结束) => 数组能遍历 =>  类数组 长的像数组？能不能遍历
//迭代器就是遍历器

// 有索引，有长度，类数组
const likeArray = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 };

/*
** [...likeArray]，..拓展运算符：原理就是遍历这个对象 将结果放到数组中，要求这个数据必须得有个遍历器
** new Set()可以转成一个数组，[...new Set()]，因为new Set()具备遍历器
** Array.from(likeArray); 可以把一个类数组转成数组，会根据长度，生成数组，把值放到数组里，不认识的或者空就undefined
** ...中有一个遍历器接口，遍历器接口可以通过生成器来生成
** [Symbol.iterator]表示给当前对象增加一个自定义属性  console.dir([]) => 有一个 Symbol[Symbol.iterator]
** 只要遍历对象，就会调用 Symbol.iterator
*/


/*
** 1.给类数组增加一个遍历器
*/
likeArray[Symbol.iterator] = function () {
    let i = 0;
    return { // 遍历器，遍历值value，done表示是否遍历完成
        next:()=>{  // 定义成箭头函数，this就是likeArray，否则this是next
            return {
                value: this[i], 
                done: i++ === this.length
            }
        }
    }
}

/*
** 2. generator 函数可以生产遍历器
**    generator 固定语法 yield 必须要配合着*来使用
**    yield不等异步函数
*/
// “元”编程 自己改写js 原有的功能，增加了遍历器
likeArray[Symbol.iterator] = function * () {  // * 表示这是一个generator函数
    let i = 0;
    while(i !== this.length){ 
        yield this[i++]; // yield 会默认产出一个value 一个done
    }
}
 
console.log( [...likeArray])


/*
** 普通函数默认会从头到尾执行没有暂停的功能
** generator函数是es6提供的语法，如果碰到yield 就会“暂停”执行 （redux-sage,koa1中）
*/

function * read() {
    yield 1;
    yield 2;
    yield 3;
    // return undefined 最后相当于return undefined
}
let it = read(); // it就是迭代器，迭代器是个对象，对象上有个next方法

// 手动循环，碰到yield就停止，没有yield就结束
console.dir(it.next()); // { value: 1, done: false } 先执行1
console.dir(it.next()); // { value: 2, done: false } 再执行2
console.dir(it.next()); // { value: 3, done: false } 后执行3
console.dir(it.next()); // { value: undefined, done: true }
console.dir(it.next()); // { value: undefined, done: true }

// 自动循环，什么时候done为true就停止
let flag = false;
do{
    let {value,done} = it.next();
    console.log(value);
    flag = done;
}while(!flag);



/*
** generator函数执行流程
*/

function * read(value){
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(c);
    return c
}
// 执行模块：
// it.next() 执行 function * read() yield 1 并没有复制给a和打印
// 再执行一次 赋值a，打印a，yield 2产出值
// 蛇形执行，除了第一次之外的next方法，都是把next中的参数传递给上一次yield的返回结果
// 下一次next()是给上一个yield传参
let it = read(123);
it.next(); // 第一次的next传递参数没有任何意义，这是第一次，上一次没有yield，不会赋值
it.next('2');  // 第二次调用，传入值2，会赋给a
it.next('3'); // 3会给b


/*
** generator用法
** 需求：先读name.txt，再根据name的结果去读age.txt
*/
const fs = require('fs').promises;
function * read(){ // 代码编写更像是同步的 （执行还是异步的），真的等需要co库
    let name = yield fs.readFile('name.txt','utf8'); // 读name.txt的返回值就是age.txt
    let age = yield fs.readFile(name,'utf8');
    return age
}
/*
** 取值，需要优化这段代码
*/
let it = read();
let {value, done} = it.next(); // value就是 fs.readFile('name.txt','utf8');返回的promise
value.then(data=>{  // 此时的 data 是fs.readFile('name.txt')返回的结果 age.txt
    // it.next(data); // 这个next是赋值给name的
    let {value, done} = it.next(data); // 此时的value是fs.readFile(name,'utf8')返回的promise
    value.then(data => {
        // it.next(data); // 读出的值，赋给age变量
        let {value, done} = it.next(data);
        console.log(value) // 这个value是return后的结果
    })
})



/*
** co库， 配合generator需要引入co包
*/

// 优化这段代码  tj
// co库可以把迭代器转换成Promise
const co = it =>{
    return new Promise((resolve,reject)=>{
        // 异步迭代靠的是 回调函数
        function next(data){
            let {value,done} = it.next(data);
            if(!done){
                // 默认成功后会调用next方法 将结果传递到next函数中
                Promise.resolve(value).then(next,reject);
            }else{
                resolve(value);
            }
        }
        next(); // 先调一次
    });
}
co(read()).then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err)
})


/*
** async + await = generator + co
** async await 替换掉了generator 和 co 默认async 函数执行后返回的就是一个promise
** async替换*，await替换yield，不需要co，返回的就是一个promise
*/
async function read(){
    let name = await fs.readFile('name.txt','utf8');
    let age = await fs.readFile(name,'utf8');
    return age
}



// let it = read();
// let {value,done} = it.next();
// value.then(data=>{
//     let {value,done} = it.next(data);
//     value.then(data=>{
//         // it.throw('error')  捕获异常
//         let {value,done} = it.next(data);
//         console.log(value)
//     })
// })


// read().then(data=>{
//     console.log(data)
// })