const fs= require('fs');
const path = require('path');


fs.createWriteStream()
const ReadStream = require('./readStream'); // 64k   4:1
const WriteStream = require('./writeStream'); // 16k 

// 可读流.pipe(可写流) 1.异步的  2.可以实现 读一点写一点
// fs.createReadStream('./name.txt').pipe(fs.createWriteStream(path.resolve(__dirname,'copy.txt')))


let rs = new ReadStream('./name.txt');
let ws = new WriteStream('./copy.txt');

// readFile
rs.pipe(ws);

