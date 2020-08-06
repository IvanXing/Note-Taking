const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('mime');

// 多语言 实现方案非常多 1. 一个完整多个路径来实现多语言 2 . 前端来实现多语言（先配置好两种语言，动态切换内容）  i18n  vue-i18n  2.服务端的header 来实现切换多语言 
const messages = {
    en: {
        message: {
            hello: 'hello world'
        }
    },
    ja: {
        message: {
            hello: 'こんにちは、世界'
        }
    },
    'zh-CN': {
        message: {
            hello: '你好'
        }
    }
}
// Accept-Language: zh;q=0.9,XXX 浏览器会发送给我这样一个信息
const querystring = require('querystring');
const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    const absPath = path.join(__dirname, pathname);
    fs.stat(absPath, (err, statObj) => {
        if (err) {
            return res.end('Not Found')
        }

        let lans = req.headers['accept-language'];
        if (lans) {
            let r = querystring.parse(lans, ',', ';');
            // { 'zh-CN': '', zh: 'q=0.9', en: 'q=0.8' } 
            // 根据权重进行排序
            let arr = []; // [{name:'zh-CN',q:1},{},{}]

            Object.keys(r).forEach(key => {
                if (r[key] == '') {
                    arr.push({ name: key, q: 1 })
                } else {
                    arr.push({ name: key, q: r[key].split('=')[1] })
                }
            })
            arr.sort((a, b) => b.q - a.q);
            for (let i = 0; i < arr.length; i++) {
                let messageObj = messages[arr[i].name];
                if (messageObj) {
                    res.end(messageObj.message.hello);
                }
            }
        }
        return res.end(messages['en'].message.hello);

    })

}).listen(3000);