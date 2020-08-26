/*
** 实现自定义的模板引擎 
/

/*
** 使用ejs
*/
// const ejs = require('ejs'); // 第三方模块 npm install ejs
// const path = require('path');
// ejs.renderFile(path.resolve(__dirname,'template.html'),{name:'paul',age:11,arr:[1,2,3]},(err,data)=>{
//     console.log(data); // 输出替换值的html
// })

// 思路
// 1. 正则替换特殊字符
// 2. 替换值 with 语法 生成字符串
// 3. new Function执行字符串

const path = require('path');
const fs = require('fs');
const renderFile = (filePath, obj, cb) =>{  // 参数：文件路径，数据，回调
    // 异步文件读取
    fs.readFile(filePath, 'utf8', function (err, html) {
        if(err) {
            return cb(err, html);
        }
        // 解析{{name}}
        //  1. / {{ [^}] }} /  => 双大括号中是一个非} 的任意字符
        //  2. / {{ [^}]+ }} /  => 双大括号中是一个非} 的任意字符，+表示至少有一个字符，前后希望有空格可以加\s
        //  3. / \{\{ [^}]+ \}\} /  => 大括号会有自己的特殊含义，加\转义一下
        //  4. / \{\{ ( [^}]+ ) \}\} /  => () 表示值得一个分组
        //  5. /\{\{([^}]+)\}\}/g => 每次全局匹配完会匹配下一个 /g 全局

        // 

        html = html.replace(/\{\{([^}]+)\}\}/g, function () { // RegExp.$1

            // arguments[0] 就是匹配到的原字符串 arguments[1] 就是第一个括号
            // arguments[1] 输出结果 name age
            
            let key = arguments[1].trim();  // 去掉头尾空格
            return obj[key]; // 返回值
            // return '${'+key+'}'  // {{name}} => ${name}  
        });
        // let head = `let str = '';\r\n with(obj){\r\n`;
        // head += 'str+=`'
        // html = html.replace(/\{\%([^%]+)\%\}/g,function () {
        //     return '`\r\n'+arguments[1] + '\r\nstr+=`\r\n'
        // })
        // let tail = '`}\r\n return str;'
        // let fn = new Function('obj',head + html + tail)
        // cb(err,fn(obj));
        cb(err, html);
    });
}
renderFile(path.resolve(__dirname,'my-template.html'),{name:'zf',age:11,arr:[1,2,3]},function (err,data) {
    console.log(data);
});


