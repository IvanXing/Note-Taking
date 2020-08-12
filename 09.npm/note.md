## npm node包管理器，管理的都是node的模块
- 3n nrm（node中源管理工具） nvm （node中的版本管理工具） npm(包管理工具)


## 第三方模块分为两种 
- 全局模块 （只能在命令行中使用 任何路径都可以）
- 本地模块 （开发或者上线使用的)


## 包的初始化工作 
```bash
npm init -y
```

## 全局模块的安装
```bash
npm install nrm -g
```

> C:\Users\test1\AppData\Roaming\npm\nrm -> C:\Users\test1\AppData\Roaming\npm\node_modules\nrm\cli.js

> 将当前安装的模块放到npm 目录下（快捷键），当我执行nrm命令时 会自动执行cli.js

nrm的使用 `nrm ls` `nrm use` `nrm current` 再操作配置文件

## 自己编写一个全局包
- computed 1 2 3 4 

- 1.先创建bin的配置
- 2.#! /usr/bin/env node 以什么方式来运行
- 3.放到npm全局中 （上传后下载-g , 直接临时拷贝过去） `npm-link`


## 安装项目包（开发时使用 生产环境使用）
- npm i webpack (--save-dev || -D)
- 项目依赖 (--save) 开发依赖 (--save-dev) 同版本依赖 vue vue-template-compiler 可选依赖 打包依赖 
- bootstrap  jquery 


## 版本问题
- major(破坏性更新).minor(增加功能 修订大版本中的功能).patch(小的bug)
- ^ ~ >= <=  
- ^2.0.0 不能小于 不能超过3  (限制大版本)
- ~2.3.0 (险种中间版本)
- >= 
- <=
- 1.0.0-2.0.0


- alpha预览版(内部测试的版本) beta（公测版本） rc （最终测试版） =》 上线

npm install xxx@2.1.0-beta.1
  

## 运行脚本问题
- 默认运行npm run 时会将node_modules下的.bin目录放到全局下所有可以使用当前文件夹下的命令
- npx 命令 npm 5.2之后提供的（这个命令没有npm run好管理） npx可以去下载包 下载完毕后执行，执行后删除


