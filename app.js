//const http = require('http')
const dotenv = require('dotenv').config('./.env')
const express = require('express')
const middleware = require('./utils/middleware')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login');
const resetRouter = require('./controllers/reset');
const blogXROUTER = require('./controllers/blogXROUTER');


app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())
app.use(middleware.getToken)
//blogrouter just provides a generic/default url like /api/blogs so you dont write it again n again
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/testing/',resetRouter);
app.use('/blogs',blogXROUTER)
//app.use('/api/blogs/',commentRouter);

module.exports = app;
