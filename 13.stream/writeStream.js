const fs = require('fs');
const EventEmitter = require('events');
let LinkedList = require('./linkList');
class Queue {
    constructor() {
        this.LinkedList = new LinkedList();
    }
    offer(element) {
        this.LinkedList.add(element);
    }
    poll() {
        return this.LinkedList.remove(0);
    }
}
class WriteStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.autoClose = options.autoClose || true;
        this.encoding = options.encoding || 'utf8';
        this.start = options.start || 0;
        this.mode = options.mode || 0o666;
        this.highWaterMark = options.highWaterMark || 16 * 1024;

        // 维护当前存入的数据个数
        this.len = 0; // 每次调用write方法 会根据写入的内容的个数累加给len属性  (缓存的长度)
        this.writing = false; // 当前写入数据的时候  (是否是正在写入)
        this.needDrain = false; // 是否需要触发drain事件 (触发drain事件)
        this.offset = this.start; // 写入的便宜量 （可变的偏移量）
        this.cache = new Queue(); // 用来缓存 多次的写入操作（除了第一次），
        this.open(); // 默认先打开文件
    }
    open() { // open方法是异步的
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) return this.emit('error', err);
            this.fd = fd;
            this.emit('open', fd);
        })
    }
    // 数据的格式 可以是stirng or buffer
    write(chunk, encoding = 'utf8', cb = () => {}) { // 用户是同步调用的write方法
        // 用户的写入操作
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.length;
        let flag = this.len < this.highWaterMark; // 这就是write的返回值
        this.needDrain = !flag // drain事件的触发 1.必须写入的个数达到预期 || 超过预期
        if(this.writing){
            // 正在写入
            this.cache.offer({
                chunk,encoding,cb
            })
        }else{
            // 没有正在写入
            this.writing = true; // 标识正在写入了
            this._write(chunk,encoding,()=>{
                cb(); // 原来的用户传入的callback
                this.clearBuffer(); // 当前内容写入完毕后 情空缓存区中的内容
                // 当前第一个写完之后 需要情空缓存中的内容
            }); // 真正写入的逻辑
        }
        return flag; // 多个异步操作 操作同一个文件如何处理 （队列）
    }
    _write(chunk,encoding,cb){ // ?
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>this._write(chunk,encoding,cb))
        }
        // 将用户的数据写入到文件中
        fs.write(this.fd,chunk,0,chunk.length,this.offset,(err,written)=>{
            this.len -= written; // 缓存中的数量要减少
            this.offset += written;
            cb(); // 当前文件内容写入完毕后，在去情空缓存中的
        });
        // 真正写入的逻辑 肯定是fs.write(fd)
    }
    clearBuffer(){ // >
        let data = this.cache.poll();
        if(data){
            // 需要缓存
            let {chunk,encoding,cb} = data;
            this._write(chunk,encoding,()=>{
                cb();
                this.clearBuffer(); // 当前缓存的第一个执行后，再去清空第二个
            })
        }else{
            this.writing = false; // 这三个写完了
            if(this.needDrain){
                this.needDrain = false; // 当前触发后下次就不需要再次触发了
                this.emit('drain');
            }   
        }
    }
}
module.exports = WriteStream;