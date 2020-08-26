/*
** 测试 模板引擎 思路
*/

function anonymous(obj) {

    // 初始化一个空字符串，把需要执行的部分拼到这个字符串上
    // 只拼接需要留下来的结果，arr.forEach是JS，不拼接
    let str = '';

    // with可以解决作用域问题，以当前obj，作为this，this.arr.forEach
    with(obj) {
        str += `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        ${name} ${age}
        `
        arr.forEach(item => {
            str += `
    
            <li>${item}</li>
        `
        })
        str += `
    
    </body>
    </html>`
    }
    return str;
}
let r = anonymous({name: 'lisan', age: 30, arr:[1,2,3]});
console.log(r)

// 1.需要把my-template.html中字符串中 {%%} 特殊字符替换掉，并拼接出一个结果的字符串，用new Function的方式执行，并用with解决作用域问题