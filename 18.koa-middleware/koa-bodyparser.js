const querystring = require('querystring');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
// 中间件的功能可以扩展属性 / 方法
module.exports = function(uploadDir) {
    return async (ctx, next) => {
        await new Promise((resolve,reject)=>{
            const arr = [];
            ctx.req.on('data',function (chunk) {  
                arr.push(chunk);
            })
            ctx.req.on('end',function () {
                if(ctx.get('content-type') === 'application/x-www-form-urlencoded'){
                    let result = Buffer.concat(arr).toString();
                    ctx.request.body = querystring.parse(result);
                }
                if(ctx.get('content-type').includes('multipart/form-data')){ // 二进制不能直接toString 可能会乱码
                    let result = Buffer.concat(arr); // buffer
                    let boundary = '--'+ ctx.get('Content-Type').split('=')[1];
                    let lines = result.split(boundary).slice(1,-1);
                    let obj = {}; // 服务器收到的结果全部放在这个对象中

                    lines.forEach(line=>{
                        let [head,body] = line.split('\r\n\r\n');
                        head = head.toString();
                        let key = head.match(/name="(.+?)"/)[1]
                        if(!head.includes('filename')){
                            obj[key] = body.toString().slice(0,-2);
                        }else{
                            // 是文件  文件上传 名字需要是随机的
                            let content = line.slice(head.length + 4,-2);
                            let filePath = path.join(uploadDir,uuid.v4());
                            obj[key] = {
                                filePath,
                                size:content.length
                            }
                            fs.writeFileSync(filePath,content);
                        }
                    });
                    ctx.request.body = obj;
                }
                resolve();
            })
        });
        await next(); // 完成后需要继续向下执行
    }   
}
Buffer.prototype.split = function (sep) { // 分隔符可能是中文的，我希望将他转化成buffer来计数
    let sepLen = Buffer.from(sep).length;
    let arr = [];
    let offset = 0;
    let currentIndex = 0;
    while((currentIndex = this.indexOf(sep,offset)) !== -1){
        arr.push(this.slice(offset,currentIndex));
        offset = currentIndex + sepLen;
    }
    arr.push(this.slice(offset));
    return arr;
}
// const buffer = Buffer.from('珠峰我珠峰我珠峰')
// console.log(buffer.split('我'))

