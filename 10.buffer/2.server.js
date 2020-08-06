// 服务端可以操作二进制 Buffer 可以和字符串进行相互转化
// Buffer代表的都是二进制数据 内存 （buffer不能扩容） java 数组不能扩容 动态数组， 在生成一个新的内存 拷贝过去


// 1.buffer的三种声明方式 通过长度来声明 （大小）

const buffer = Buffer.alloc(5); // 开发中数字都是字节为单位
const buffer1 = Buffer.from('珠峰'); // 根据汉字来转化成buffer
const buffer2 = Buffer.from([0x16,0x32]); // 通过数组来指定存放的内容



// 文件操作  索引修改  更改内部内容 拼接buffer


// slice()
// length 可以获取buffer字节的长度
// Buffer.isBuffer 
// concat 原理是copy
const buf1 = Buffer.from('珠峰'); // 根据汉字来转化成buffer
const buf2 = Buffer.from('架构'); // 通过数组来指定存放的内容

const bigBuf = Buffer.alloc(12);
// targetBuffer, targetStart, sourceStart, sourceEnd

Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart =0 , sourceEnd = this.length) {
    for(let i = sourceStart; i < sourceEnd;i++){
        targetBuffer[targetStart++] = this[i];
    }
}
// buf1.copy(bigBuf,0,0,6)
// buf2.copy(bigBuf,6)
// console.log(bigBuf.toString())

Buffer.concat = function (bufferList,length= bufferList.reduce((a,b)=>a+b.length,0)) {
    let buffer = Buffer.alloc(length);
    let offset = 0;
    bufferList.forEach(buf=>{
        buf.copy(buffer,offset);
        offset += buf.length;
    });
    return buffer.slice(0,offset);
}

// 文件上传 -》 分片上传 =》 “二进制” => buffer 来拼接 


console.log(Buffer.concat([buf1,buf2,buf1,buf2]).toString())

// 不具备 扩展push shift 这些方法 
// let buf = buffer.slice(0,1); // slice 方法也是“浅拷贝”
// buf[0] = 100;
// console.log(buffer)

// let myArr = [1,2,3]
// let arr = [myArr,2,3];

// let newArr = arr.slice(0);
// newArr[0][0] =100;
// console.log(myArr);

// console.log(Buffer.isBuffer(buffer))
// 