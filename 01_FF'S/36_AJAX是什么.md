## AJAX详解
### 1.标签发请求
#### 1.1 form表单提交get请求
```
<form action="/xxx" method=get>
  <input type="password" name="password">
  <input type="submit">
</form>
```
* input中输入123提交
* Network: xxx?password=123
* RequestHeaders: GET /xxx?password=123 HTTP/1.1
#### 1.2 form表单提交post请求
```
<form action="/xxx" method=post>
  <input type="password" name="password">
  <input type="submit">
</form>
```
* Network: xxx
* RequestHeaders: POST /xxx
* FormData: password=123

> form提交GET或者POST请求会刷新页面或者新开页面

### 1.3 a标签发起GET请求
```
<body>
<a id=x href="/xxx">click</a>
<script>
    setTimeout(function(){
        x.click()
    },3000)
</script>
</body>
```
* xxx GET 404 http/1.1

> a标签提交GET请求会刷新页面或者新开页面

### 1.4 img标签发请求
```
var image = document.createElement('img')
img.src = '/xxx'
document.body.appendChild(img)
img.onload = function(){
    console.log('success')
}
img.onerror = function(){
    console.log('fail')
}
```
* 用img可以发get请求，但是只能以图片的形式展示

### 1.5 link发请求
```
var link = document.createElement('link')
link.rel = 'stylesheet'
link.href = '/xxx'
document.head.appendChild(link)
```
* xxx GET 404 http/1.1
* 用link可以发get请求，但是只能以CSS、favicon的形式展示

### 1.6 script发请求
```
var script = document.createElement('script')
script.src = '/yyy'
document.head.appendChild(script)
```
* yyy GET 404 http/1.1
* 用script可以发get请求，但是只能以脚本的形式运行

> JSONP就是通过script请求一个脚本，运行脚本，不能POST

>有没有什么方式可以实现get、post、put、delete 请求都行,想以什么形式展示就以什么形式展示

> IE5率先在JS中引入ActiveX 对象（API），使得JS可以直接发起HTTP请求。
随后Mozilla、Safari、Opera 也跟进（抄袭）了，取名 XMLHttpRequest，并被纳入 W3C规范

```
window.XMLHttpRequest
var x = new XMLHttpRequest()
x
XMLHttpRequest{}
    onabort: null
    onerror: null
    onload: null
    onloadend: null
    onloadstart: null
    onprogress: null
    onreadystatechange: null
    ontimeout: null
    readyState: 0
    response: ""
    responseText: ""
    responseType: ""
    responseURL: ""
    responseXML: null
    status: 0
    statusText: ""
    timeout: 0
    upload: XMLHttpRequestUpload {onloadstart: null, onprogress: null, onabort: null, onerror: null, onload: null, …}
    withCredentials: false
    __proto__: XMLHttpRequest
```

### 2. AJAX
#### 2.1 起源
* Jesse James Garrett 讲如下技术取名叫做 AJAX：异步的 JavaScript 和 XML
    * 使用 XMLHttpRequest 发请求
    * 服务器返回 XML 格式的字符串
    * JS 解析 XML，并更新局部页面

#### 2.2 使用XMLHttprequest

* http://javascript.ruanyifeng.com/bom/ajax.html

```
myButton.addEventListener('click', (e)=>{
  let request = new XMLHttpRequest()
  request.open('get', '/xxx')                   // 配置request  put delete都可
  request.send()                                //发送
  request.onreadystatechange = ()=>{
    if(request.readyState === 4){               //4是请求相应都完毕
      console.log('请求响应都完毕了')
      console.log(request.status)
      if(request.status >= 200 && request.status < 300){
        console.log('说明请求成功')
        console.log(typeof request.responseText)  //成功的响应
        console.log(request.responseText)         //返回的json串
        let string = request.responseText        // 把符合JSON语法的字符串， 转换成JS对应的值
        let object = window.JSON.parse(string)   // JSON.parse 是浏览器提供的
        console.log(typeof object)
        console.log(object)
        console.log('object.note')
        console.log(object.note)

      }else if(request.status >= 400){
        console.log('说明请求失败') 
      }

    }
  }
})

``` 
```
  //后端代码
  }else if(path==='/xxx'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', 'http://deyunshe.com:8001')
    response.write(
      `
    {
      "note":{
        "to": "郭德纲",
        "from": "张鹤伦",
        "heading": "岳云鹏",
        "content": "吃啥"
      }
    }
    `                           //返回符合JSON对象语法的字符串
    )
    response.end()
```   

### 3.JSON
* JSON没有function和undefined
* JSON字符串首位必须是"

### 4.同源策略

* 只有协议+端口+域名一模一样才允许发AJAX请求。
  * http://baidu.com的页面 不可以向 http://www.baidu.com 发 AJAX请求。
  * http://baidu.com:80的页面 不可以向 http://baidu.com:81 发 AJAX请求。
* 表单以及标签提交到另一个域名之后，因为刷新，原页面的脚本无法获取新页面的内容，所以浏览器认为这是安全的。
* AJAX是可以读取相应内容的，因此浏览器不允许这样做，请求可以发出，只是拿不到响应。  

#### 5.CORS跨域
* Cross-Origin Resource Sharing
* response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
* response.setHeader('Content-Type', 'text/json; charset=utf-8')

#### 6.AJAX的所有功能
* 客户端的JS发起请求（浏览器上的）
* 服务端的JS发送响应（Node.js上的）
* JS 可以设置任意请求 header 吗
  * 第一部分 request.open('get', '/xxx')
  * 第二部分 request.setRequestHeader('content-type','x-www-form-urlencoded')
  * 第四部分 request.send('a=1&b=2')
* JS 可以获取任意响应 header 吗？
  * 第一部分 request.status / request.statusText
  * 第二部分 request.getResponseHeader() / request.getAllResponseHeaders()
  * 第四部分 request.responseText





