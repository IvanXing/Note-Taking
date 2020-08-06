
const Application = require('./application');


// 1.创建应该的过程 和 应用本身也要进行分离
// 2.我希望将路由和创建应用的过程做一个分离
function createApplication(){ // express
    return new Application(); //通过类来实现分离操作
}
module.exports = createApplication;