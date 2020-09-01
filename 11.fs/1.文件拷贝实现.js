/*
** 文件拷贝，读一点写一点，回调古老方式
*/
// 读和写的操作 都耦合在一起了 需要实现一个方法 可用一行搞定 pipe管道

const fs = require('fs');
const path = require('path');   // path.resolve处理成绝对路径

/*
** 实现，参数：源文件地址，目标文件地址，回调
*/
/*
** 写的操作 没有文件会自动创建，文件中如果已经有内容，会清空文件
*/
const copy = (source, target, callback) => {

    const SIZE = 3;
    const buffer = Buffer.alloc(SIZE);  // 每次放3个
    let readOffset = 0; // 读的偏移量
    let writeOffset = 0;

    /*
    ** 打开源文件
    */
    fs.open(source, 'r', (err, rfd) => { // rfd，这个读文件描述符是一个数字，linux 规定的，windows从3开始，mac从20多开始
        if (err) return callback(err);

        /*
        ** 打开目标文件
        */
        // w 默认就覆盖 writeFile，a是追加
        fs.open(target, 'w', (err, wfd)=>{ // wfd，是写文件的描述符 
            if(err) return callback(err);

           
            const next = () =>{

                // rfd文件，向 buffer 中从第0个开始写 SIZE个，readOffset偏移量，第一次从0开始读
                fs.read(rfd, buffer, 0, SIZE, readOffset, (err, bytesRead)=>{ // bytesRead 读取到的个数
                    // 读取到几个就往文件中写几个
                    if (err) return callback(err);
                    
                    // 更改读取的偏移量
                    readOffset += bytesRead; 

                    // 写到文件中 buffer中转
                    fs.write(wfd, buffer, 0, bytesRead, writeOffset, (err, written)=>{
                        if (err) return callback(err);

                        writeOffset += written// 更改写入的的偏移量

                        if(bytesRead == SIZE){ // 本次读取完毕后 可能还有结果
                            next();
                        }else{  // 小于size 读完了
                            fs.close(rfd, ()=>{});
                            fs.close(wfd, ()=>{});
                            callback(); // 完成后
                        }
                    })
                })
            }
            next();
        })
    });
}

/*
** 优点：边读边写，非死循环
** 不会淹没系统的可用内存 ，合理读写 （边读边写如的方式）
*/

/*
** 目标：把name.txt拷贝到copy.txt
*/
copy(path.resolve(__dirname, 'name.txt'), path.resolve(__dirname, 'copy.txt'), (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('拷贝成功')
})