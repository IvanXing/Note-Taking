- npm init -y
- npm i nodemon -S
- nodemon 监控 demo.js 忽略 data 文件夹

```js
 "scripts": {
    "dev": "nodemon ./demo.js -i ./data/"
  },
```

- npx nodemon ./demo.js
- npm i node-fetch -S
