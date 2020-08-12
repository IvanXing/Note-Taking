// 什么是高阶函数：
// 1.如果一个函数的参数是一个函数 (回调函数就是一种高阶函数)
// 2.如果一个函数返回一个函数 当前这个函数也是一个高阶函数

// 高阶函数的应用场景： 为了稍后写promise做铺垫

// 借助高阶函数实现一个封装，不改变当前公共逻辑

// 写了一个业务代码，要扩展当前的业务代码，不要破坏原有函数(公共逻辑)
// 对say方法进行一定的扩展，会写在say函数中，原有的say方法就被改写了
function say(a,b){
    console.log('say',a,b);
}
// 调用say方法之前，再去调用某个功能
// 给某个方法 添加一个方法在他执行之前调用,所有实例都有，放在原型上
// 谁调用，this就是谁
Function.prototype.before = function (callback) {
  let that = this;  // let that = this, before是say调用的， 不写这句，this是window
  return function() {
    callback();
    this();
  }
}

// 解决调用不确定的问题，但是箭头函数中没有this也没有arguments，所有用剩余运算符
Function.prototype.before = function (callback) {
    return (...args)=>{ // 剩余运算符（在函数参数里，把参数组成数组）， 箭头函数中没有this（向上找） 也没有arguments
        callback();
        this(...args); // 展开运算符（在调用里，把参数依次传入，展开数组）  apply的用法
    }
}

// before 返回的还是一个可执行函数 谁调用 this就是谁
let beforeSay = say.before(function(){
    console.log('before say')
})
beforeSay('hello','world');
