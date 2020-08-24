const Promise = require('./promise');
let p = new Promise((resolve, reject) => {
    reject(1);
});
// 值穿透 的实现 then里的参数是可选参数，成功以及失败可以不传，都忽略，上面的1还是依次传过来了
p.then().then().then(data=>{
    console.log(data);
},err=>{
    console.log(err,'err');
})

