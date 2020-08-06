
// 多个异步请求 如何同时获取最终结果

let fs = require('fs'); // file system
let school = {}

// 利用计数器，两次readFile之后打印
// let index = 0;
// const cb = () =>{
//     if(++index === 2){
//         console.log(school)
//     }
// }

// 闭包：每次执行cb，都能拿到外层作用域的times变量，且没有被销毁，可以--
// after中return的函数是在after作用域下定义的，但是是在外界执行的，此时就可以拿到外层函数times这个变量
// 定义和执行不在一个作用域下

function after(times,callback){
    return function(){ //  闭包函数  函数的定义的作用域和函数执行的作用 不在同一个作用域下
        if(--times == 0){
            callback();
        }
    }
}
let cb = after(2,function () {  // cb执行两次之后，的回调
    console.log(school)
});
// ./以根目录为基准读取 插件的问题 err 读取失败 data 读取成功的参数
// fs.readFile是异步的，但是两个readFile的顺序是不一定的
// 需求：都执行完拿到结果
fs.readFile('./name.txt','utf8',function (err,data) {
    school.name = data;
    cb();
})
fs.readFile('./age.txt','utf8',function (err,data) {
    school.age = data;
    cb();
});
