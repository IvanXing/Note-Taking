const mongoose = require('mongoose');
// 1.链接mongodb, 返回链接成功后的对象
let conn = mongoose.createConnection('mongodb://jw:jw@localhost:27017/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); // 创建连接

conn.on('connected', function() {
    console.log('链接成功了')
});
// 主要的目的是操作数据 增删改查
// (1增加数据 mongo 可以随机存储 （第一个对象可以有100个字段，第二个可以两百个字段）) 
// Schema 骨架 根据这个骨架来创建内容 
// Schema 是用来规范文档的
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
    }
},{collection:'Student'}); // 设置固定的名字
// 通过骨架 来创建模型 =》 集合  db.student.insert()
let Student = conn.model('Student',StudentSchema); // student 就是模型
// 模型可以操作数据, 多的字段不会插入 ，少的就是空
Student.create({aa:1,password:'zf',age:11}).then(doc=>{
    console.log(doc);
    conn.close();
});
// mongo 库 （数据库）-> 集合 （表）-> 文档 （内容）