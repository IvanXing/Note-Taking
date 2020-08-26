while(true) {

}

setTimeout(()=>{
  console.log('ok')
},1000);

//  代码从上到下执行，JS主线程，while true进入死循环，不会去执行定时器