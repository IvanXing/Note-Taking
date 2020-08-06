const express = require('../express');




let router = express.Router(); // 是个构造函数
router.get('/add',function (req,res) {
    res.end('/article-add')
})
router.get('/remove',function (req,res) {
    res.end('/article-remove')
})

let router1 = express.Router();
router1.get('/xxx',function (req,res) {
    res.end('xxxxxx')
});
router.use('/xx',router1)
module.exports = router;