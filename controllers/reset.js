const resetRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/Users')

resetRouter.post("/reset",async (req,res)=>{
    await Blog.deleteMany({});
    await User.deleteMany({});
    
    res.send(204).end();
})

//resetRouter.get("/:id",async (req,res)=>{
//    const id = req.params.id;
//    await User
//    
//    res.send(204).end();
//})

module.exports = resetRouter;