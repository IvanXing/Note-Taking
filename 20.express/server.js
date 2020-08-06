const express = require('./express');
const userRouter =require('./routes/userRouter');
const articleRouter = require('./routes/articleRouter')

const app = express();

// 对用户进行操作 对文章进行操作

// /user/add
app.use('/user',userRouter);
app.use('/article',articleRouter);


app.listen(3000);