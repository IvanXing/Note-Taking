const config = {
    // 设置端口号的配置
    port: {
        option: '-p,--port <val>',
        description: 'set your server port',
        usage: 'zhu-http-server --port 3000',
        default:3000
    },
    // 可以配置目录
    directory: {
        option: '-d,--directory <val>',
        description: 'set your start directory',
        usage: 'zhu-http-server --directory D:',
        default:process.cwd(),
    },
    // 可以配置主机名
    host: {
        option: '-h,--host <val>',
        description: "set your hostname",
        usage: 'zhu-http-server --host 127.0.0.1',
        default:'localhost'
    }
}
module.exports = config;