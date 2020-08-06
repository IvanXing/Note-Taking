// let sum = 0;
// for(let i = 0 ; i <=7;i++){
//     sum+= Math.pow(2,i);
// }
// console.log(sum);

// // 将任意进制转换成10进制 
// console.log(parseInt('11',2))
// // 可以将任意进制转换成任意进制
// console.log((0x16).toString(16))

// 在node中需要进行文件读取，node中操作的内容默认会存在内存中，内存中的表现形式肯定是二进制的，二进制转换16进制来展现  11111111 ff

// const fs = require('fs');
// let r = fs.readFileSync('./note.md');
// console.log(r.toString()); //  Buffer可以和字符串直接相互转化



const fs = require('fs');
// gbk => utf8 是可以相互转化
const iconv = require('iconv-lite');
let r = fs.readFileSync('./name.txt');
// r = iconv.decode(r,'gbk');
console.log(r.toString());

// base64 没有加密功能（只是编码转化base64）  加密（解密）
// base64可以传输数据，可以减少http请求  （不是所有的图片都转成base64）

// 3 * 8 的规则 改成了 4*6的方式

let buffer = Buffer.from('珠'); // 将字符串转化成16进制
console.log(buffer); // e7 8f a0

console.log((0xe7).toString(2))
console.log((0x8f).toString(2))
console.log((0xa0).toString(2))

// 111001    111000    111110    100000


console.log(parseInt('111001',2))
console.log(parseInt('111000',2))
console.log(parseInt('111110',2))
console.log(parseInt('100000',2))

let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
str+='0123456789';
str+='+/';

// 57 56 62 32

console.log(str[57]+str[56]+str[62]+str[32]);  // 54+g

// 小图标适合base64转码
 
// gzip 重复性高的可以压缩  替换 把重复性高的摘出来 做替换操作

