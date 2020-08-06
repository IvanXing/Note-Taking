#! /usr/bin/env node
const program = require('commander');
const { version } = require('../package.json');
const config = require('./config');

const Server = require('../src/server');
program.usage('[args]')
program.version(version);
Object.values(config).forEach(val => {
    if (val.option) {
        program.option(val.option, val.description);
    }
});
program.on('--help', () => {
    console.log('\r\nExamples:');
    Object.values(config).forEach(val => {
        if (val.usage) {
            console.log('  ' + val.usage)
        }
    });
})
// 解析用户的参数
let parserObj = program.parse(process.argv);
let keys = Object.keys(config);

// 最终用户拿到的数据
let resultConfig = {}
keys.forEach(key=>{
    resultConfig[key] = parserObj[key] || config[key].default;
});

let server = new Server(resultConfig);
server.start(); // 开启一个server