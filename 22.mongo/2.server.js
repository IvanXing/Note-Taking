const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://jw:jw@localhost:27017/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let StudentSchema = new mongoose.Schema({ // vue 属性校验
    username: {
        type: String,
        required: true
    },
    password: String,
    age: Number,
    birthday: {
        type: Date,
        default: Date.now
    },
    hobby:[]
}, { collection: 'Student' });
let Student = conn.model('Student', StudentSchema);

(async () => {

    // (1)插入操作
    // let arr = [];
    // for (let i = 0; i < 10; i++) {
    //     arr.push({ username: 'zf' + i, password: 'zf' + i, age: i });
    // }
    // // 批量的插入 要采用数组的方式可以实现多次的插入 合并成一次操作
    // let r = await Student.create(arr);
    

    // (2)查询操作  findOne 是查询一个 find 是查询一组,查询的结果 只采用某几个字段
    // a (1) b c  a说我要出现 b,c 不能出现
    // a (1) b c(0)  c说我不出现  a，b要出现
    // _id 比较特殊 需要单独控制 0、 1
    // let r = await Student.findOne({username:'zf'},{username:1,password:1});
    // let r = await Student.findById("5ef5f7095d185f27b88ec62b")

    // 手动close 默认肯定不需要close 为了演示方便

    // (3)修改操作 操作符  参数（查询条件 ， 修改成的结果）

    // 修改所有年龄大于6的  年龄都增加一
    // where基本不用，性能差  lt:less than  gt great than  lte gte inc 递增
    // $set 新增  $push 数组新增  $addToSet 数组的添加操作  $pop 删除 ...

    // 多条件查询  {} 并且 
    // let r  = await Student.updateOne({$or:[{username:/a/},{age:31}]},{$pop:{hobby:-1}});
    // console.log(r);


    // (4)删除
    // Student.deleteMany({}); Student.deleteOne()

    // (5)分页查询  每页2条   当前是第几页第2页   分页
    let limit = 2;
    let currentPage = 2;
    // find 返回的是一个游标 指针 并不是结果  先查询 在排序 在跳过在限制
    let r =await Student.find({}).limit(limit).skip((currentPage-1) * limit).sort({age:-1});
    console.log(r);
    conn.close();

})();;