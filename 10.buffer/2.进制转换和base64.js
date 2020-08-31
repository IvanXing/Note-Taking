/*
** 进制转换方法
*/
let sum = 0;
for(let i = 0 ; i <=7;i++){
    sum+= Math.pow(2,i);  // 2的i次方
}
console.log(sum);

// 将任意进制转换成10进制 
console.log(parseInt('11',2))  // 11是2进制的
// 可以将任意进制转换成任意进制
console.log((0x16).toString(16))  // 转换16进制


/*
** 在node中需要进行文件读取，node中操作的内容默认会存在内存中，
** 内存中的表现形式肯定是二进制的，但是是二进制转换16进制来展现  11111111 => ff
** Node中默认展现形式是16进制，但是在内存中以2进制存储
*/

const fs = require('fs');
let r = fs.readFileSync('./note.md');
/*
** Buffer可以和字符串直接相互转化
** r是16进制，toString转换成字符串就是结果
*/
console.log(r.toString()); 



/*
** iconv-lite包，node只支持UTF8，name.txt中内容使用gbk另存为保存的
*/
const fs = require('fs');
// gbk => utf8 是可以相互转化
const iconv = require('iconv-lite');  // iconv-lite 第三方包 2进制转换格式
let r = fs.readFileSync('./name.txt');
r = iconv.decode(r,'gbk');
console.log(r.toString());



/*
** base64编码转换，文字和图片方式不同，以下文字转换
** base64 没有加密功能（只是编码转化base64）  加密（解密）
** base64可以传输数据，可以减少http请求  （不是所有的图片都转成base64）
*/
// 3 * 8 的规则 改成了 4*6的方式

let buffer = Buffer.from('珠'); // 将字符串转化成16进制
console.log(buffer); // e7 8f a0 十六进制
// 先变成3个二进制
console.log((0xe7).toString(2))
console.log((0x8f).toString(2))
console.log((0xa0).toString(2))
// 11100111   10001111   10100000   => 3 * 8规则
// 111001  111000  111110  100000   => 4 * 6规则  base64 每个值永远不大于64
// 把每个值转换成十进制
console.log(parseInt('111001',2))
console.log(parseInt('111000',2))
console.log(parseInt('111110',2))
console.log(parseInt('100000',2))
// 57 56 62 32
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
str+='0123456789';
str+='+/';
// 57 56 62 32 去取值
console.log(str[57]+str[56]+str[62]+str[32]);  
// 54+g  这就是base64编码

/*
**  e7 8f a0 ==> 54+g  base64转换后，三个字节变成了四个字节，会变大
*/
// 小图标适合base64转码
 
// gzip 重复性高的可以压缩  替换 把重复性高的摘出来 做替换操作

