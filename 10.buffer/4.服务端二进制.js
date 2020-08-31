// 服务端可以操作二进制 Buffer，好处是可以和字符串进行相互转化
// Buffer代表的都是二进制数据，内存，（buffer不能扩容）
// java 数组不能扩容，动态数组， 想扩大，再生成一个新的内存 拷贝过去


/*
** 1.buffer的三种声明方式 通过长度来声明 （指定大小）
*/
const buffer = Buffer.alloc(5); // 开发中数字都是字节为单位，5个字节
const buffer1 = Buffer.from('珠峰'); // 根据汉字来转化成buffer
const buffer2 = Buffer.from([0x16,0x32]); // 通过数组来指定存放的内容



// 文件操作可以通过1.索引修改，2.更改内部内容，还有3.拼接buffer

// 常用API
// slice() 浅拷贝
// length 可以获取buffer字节的长度
// Buffer.isBuffer  类上的静态属性
// concat 实现两个buffer的拼接，原理是copy

const buf1 = Buffer.from('珠峰'); // 根据汉字来转化成buffer
const buf2 = Buffer.from('架构'); // 通过数组来指定存放的内容

const bigBuf = Buffer.alloc(12);
// targetBuffer, targetStart, sourceStart, sourceEnd

// copy 方法实现
Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart =0 , sourceEnd = this.length) {
    // 循环buffer 赋值给目标buffer
    for(let i = sourceStart; i < sourceEnd;i++){
        targetBuffer[targetStart++] = this[i];  
    }
}
// buf1.copy(bigBuf, 0, 0, 6)
// buf2.copy(bigBuf, 6)
// console.log(bigBuf.toString())

Buffer.concat = function (bufferList, length= bufferList.reduce((a,b)=>a+b.length,0)) {
    let buffer = Buffer.alloc(length);
    let offset = 0;
    bufferList.forEach(buf=>{
        buf.copy(buffer,offset);
        offset += buf.length;
    });
    return buffer.slice(0,offset);
}

// 文件上传 -> 分片上传 => “二进制” => buffer 来拼接 


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