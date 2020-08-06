## cookie 和 session  和 localStorage的区别
- localStorage 和 sessionStorage 本地存储 （发送请求是不携带的）
- localStorage 浏览器关闭后不会销毁（必须手动销毁） sessionStorage（浏览器关闭后就销毁） 5M
- localStorage和sessionStorage 跨域？ 不能跨域

- http无状态的，可以通过cookie来制造状态 （浏览器设置cookie，服务端也可以设置cookie） 每次发请求默认会携带cookie （不安全 数据是存在客户端的  不能存放敏感信息）
- session 基于cookie的 通过cookie的机制 制造一个服务端存储的空间 (对象)  重启服务丢失了 redis 可以用来存储session  （多个平台共享状态，数据丢失怎么办？）

- JWT JSON WEB TOKEN (不存在服务器的)