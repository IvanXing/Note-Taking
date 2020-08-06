const http = require('http');
const url = require('url');
const routers = [
    {path:'*',method:'all',handler(req,res){ // 默认路由
        res.end(`Cannot my ${req.method} ${req.url}`);
    }}
];
// pop push 栈  push unshift 队列
function createApplication(){ // express
    return {
        get(path,handler){
            routers.push({
                path,
                method:'get',
                handler
            });
        },
        listen(){
            const server = http.createServer((req,res)=>{
                let {pathname} = url.parse(req.url);
                let requestMethod = req.method.toLowerCase();

                for(let i = 1; i < routers.length;i++){
                    let {path,method,handler} = routers[i];
                    if(path == pathname && method == requestMethod){
                        return handler(req,res);
                    }
                }
                return routers[0].handler(req,res)
            });
            server.listen(...arguments)
        }
    }
}
module.exports = createApplication;