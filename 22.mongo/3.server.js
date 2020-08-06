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
    hobby: []
}, { collection: 'Student' });
let Student = conn.model('Student', StudentSchema);

let HomeWorkSchema = new mongoose.Schema({
    title: String,
    content: String,
    student: {
        ref: 'Student',
        type: mongoose.SchemaTypes.ObjectId // 用户的id好
    }
}, { collection: 'Homework' });

let HomeWork = conn.model('Homework',HomeWorkSchema);

(async () => {
    // let user = await Student.create({ username: 'zs', password: 'ls' });

    // let home =await HomeWork.create({title:'标题',content:'内容',student: user._id});

    let r = await HomeWork.findById('5ef5ffafd12605015ca0d641').populate('student',{username:1});
    // 查询后要修改 操作数据有两种方式  模型来操作， 通过文档来自己操作自己
    r.title = '标题2';
    await r.save(); // 修改操作 
    // 什么时候用文档 什么时候集合
    conn.close();

    // mongoose.createIndex()
    // mongoose.Aggregate 聚合
})();