// -------------core------------------
const http = require('http');
const fs = require('fs').promises;
const { createReadStream, createWriteStream, readFileSync } = require('fs');
const url = require('url');
const path = require('path'); // babel-node  (webpack)
const crypto = require('crypto');

// ------------------------------------
const ejs = require('ejs'); // 服务端读取目录进行渲染
const debug = require('debug')('server');
const mime = require('mime');
const chalk = require('chalk'); //  粉笔

const template = readFileSync(path.resolve(__dirname, 'template.ejs'), 'utf8');

// 根据环境变量来进行打印 process.env.DEBUG
class Server {
    constructor(config) {
        this.port = config.port;
        this.directory = config.directory;
        this.host = config.host;
        this.template = template;
        // this.handleRequest = this.handleRequest.bind(this); // 绑定死this
    }
    async handleRequest(req, res) {
        // 指的就是当前自己Server的实例 
        let { pathname } = url.parse(req.url); // 不考虑传递参数问题
        pathname = decodeURIComponent(pathname); // 将中文进行一次转义
        // 通过路径找到这个文件返回
        let filePath = path.join(this.directory, pathname);
        try {
            let statObj = await fs.stat(filePath);
            if (statObj.isFile()) {
                this.sendFile(req, res, filePath, statObj)
            } else {
                // 文件夹 文件夹先尝试找index.html
                let concatfilePath = path.join(filePath, 'index.html');

                // 如果存在 html
                try {
                    let statObj = await fs.stat(concatfilePath);
                    this.sendFile(req, res, concatfilePath, statObj);
                } catch (e) {
                    // 列出目录结构
                    this.showList(req, res, filePath, statObj, pathname);
                }
            }
        } catch (e) {
            this.sendError(req, res, e);
        }
    }
    async showList(req, res, filePath, statObj, pathname) {
        // 读取目录包含的信息
        let dirs = await fs.readdir(filePath);
        // 渲染列表
        try {
            // 异步渲染
            let parseObj = dirs.map(item => ({
                dir: item,
                href: path.join(pathname, item) // 路径是用自己的路径 拼接当前url的路径
            }));
            let r = await ejs.render(this.template, { dirs: parseObj }, { async: true });
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(r);
        } catch (e) {
            this.sendError(req, res);
        }
    }
    gzip(req, res, filePath, statObj) {
        if (req.headers['accept-encoding'] && req.headers['accept-encoding'].includes('gzip')) {
            res.setHeader('Content-Encoding', 'gzip')
            return require('zlib').createGzip(); // 创建转化流
        } else {
            return false;
        }
    }
    async cache(req, res, filePath, statObj) {
        res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString());
        res.setHeader('Cache-Control', 'max-age=10');
        let fileContent = await fs.readFile(filePath);
        let ifNoneMatch = req.headers['if-none-match'];
        let etag = crypto.createHash('md5').update(fileContent).digest('base64');
        let ifModifiedScince = req.headers['if-modified-since'];
        let ctime = statObj.ctime.toGMTString()
        res.setHeader('Last-Modified', ctime);
        res.setHeader('Etag', etag);

        if (ifNoneMatch !== etag) {  // 摘要 一般取 文件大小 加一些标识来判断
            return false;
        }

        if (ctime !== ifModifiedScince) {// last-modified 不够准确
            return false
        }
        return true;
    }


    async sendFile(req, res, filePath, statObj) {

        // 缓存
        try{
            let cache = await this.cache(req, res, filePath, statObj);
            if (cache) { //  有缓存直接让用户查找缓存即可
                res.statusCode = 304;
                return res.end()
            }
        }catch(e){
            console.log(e)
        }
       


        // 读取文件进行相应
        // ie浏览器 试一下 默认都是文本

        // 这里需要掌握 header 来看一下浏览器是否支持gzip压缩

        // 客户端和服务端定义的一个规则  相互能识别的规则
        let gzip = this.gzip(req, res, filePath, statObj);
        if (gzip) {
            res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8');
            createReadStream(filePath).pipe(gzip).pipe(res);
        } else {
            createReadStream(filePath).pipe(res);
        }
    }
    // 专门又来处理错误信息
    sendError(req, res, e) {
        debug(e);
        res.statusCode = 404;
        res.end('Not Found');
    }
    start() {
        // const server = http.createServer((req,res)=>this.handleRequest(req,res));
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, this.host, () => {
            console.log(chalk.yellow(`Starting up http-server, serving ./${this.directory.split('\\').pop()}\r\n`));
            console.log(chalk.green(`       http://${this.host}:${this.port}`));
        })
    }
}
module.exports = Server;
// gzip 压缩（前端可以通过webpack插件进行压缩）  如果前端压缩了 那通过后端直接返回即可 ，后端在返回的时候，在进行压缩  .gz
// 服务端优化  （压缩 + 缓存）


// 缓存 + 断点续传 。。。
// npm 上