// 函数柯里化 函数反柯里化

// 柯里化=>把大的范围转成小的范围

// 判断变量的类型
// 常用的判断类型的方法有四种：
// 1.typeof 不能判断 对象类型 typeof []  typeof {}  都是‘object’
// 2.constructor  可以找到这个变量是通过谁构造出来的， [].constructor => f Array()，({}).constructor => f Object()
// 3.instanceof 判断谁是谁的实例 __proto__（会有不准确的情况）， [1,2] instanceof Array === true
// 4.Object.prototype.toString.call()  call中传的就是this把this打印成字符串，缺陷就是不能细分是谁谁的实例
// 对象原型上提供的toString方法   Object.prototype.toString.call('dddddd') ==> "[object String]"


// 判断变量是不是什么类型
function isType(type, value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
}

// console.log(isType('Arary', [1, 2]))  // 容易写错类型
// 能不能将方法进行细分  isType 范围太大，细分成  isString isArray

// 改写
// function isType(type) {
//     return function(value) {
//         return Object.prototype.toString.call(value) === `[object ${type}]`;
//     }
// }
// let isArray = isType('Array');    // isArray是isType为array的返回值
// console.log(isArray('hello'))
// console.log(isArray([]));


function isType(type, value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
}

// 通过一个柯里化函数 实现通用的柯里化方法，就是把一个大的范围变成小的范围
const currying = (fn, arr = []) => {
    let len = fn.length; // 这里获取的是函数的参数的个数
    return function(...args) { // 高阶函数
        let concatValue = [...arr, ...args];  // 累加参数=>扩展运算符
        if (a.length < len) {
            return currying(fn, concatValue); // 递归不停的产生函数
        } else {
            return fn(...concatValue); // 执行isType函数
        }
    }
}
// 包装
let isArray = currying(isType)('Array') // bind
let isString = currying(isType)('String')
// 调用
console.log(isArray([]));
console.log(isArray('string')); // 这里拼接了
console.log(isArray([]));
// 第一次我们传入了一个数组

// function sum(a,b,c,d,e,f){
//     return a+b+c+d+e+f
// }
// let r = currying(sum)(1,2)(3,4)(5)(6)
