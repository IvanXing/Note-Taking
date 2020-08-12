// 发布订阅模式 主要分成两个部分  on（订阅）  emit（发布）
// on 订阅，就是把一些函数维护到一个数组中
// emit 就是让数组中的方法依次执行

// 订阅和发布没有明显的关联， 靠中介来事
// 发布和订阅之间没有关联


let fs = require('fs');
// 租赁 房屋
let event = { // 订阅和发布没有明显的关联， 靠中介来事
    arr:[],
    on(fn){
        this.arr.push(fn); // 将函数依次存储到数组中，不停地订阅，不停的push进去
    },
    emit(){
        this.arr.forEach(fn=>fn()); // 依次执行
    }
}

// 订阅
event.on(function () {
    console.log('读取了一个')
})
event.on(function () {
    if(Object.keys(school).length === 2){
        console.log('读取2个完毕', school)
    }
})


let school  = {}
fs.readFile('./name.txt','utf8',function (err,data) {
    school.name = data;
    event.emit();  // 发布
});
fs.readFile('./age.txt','utf8',function (err,data) {
    school.age = data;
    event.emit();
});

// 结果输出两次读取了一个 输出了一个完成的对象
