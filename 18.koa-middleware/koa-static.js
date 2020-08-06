const path = require('path');
const mime = require('mime');
const fs = require('fs').promises;
module.exports = function static(root) {
    return async (ctx, next) => {
        let filePath = path.join(root, ctx.path);
        try {
            let statObj = await fs.stat(filePath);
            if (statObj.isFile()) {
                // 是文件就自己处理
                ctx.type = mime.getType(filePath) + '; charset=utf-8';
                ctx.body = await fs.readFile(filePath);
                // 这里不用next了 因为已经处理完毕了
            } else {
                await next();
            }
        } catch (e) {
            await next();
        }
    }
}