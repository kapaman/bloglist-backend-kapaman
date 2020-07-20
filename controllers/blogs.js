const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  let result = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  });
  response.json(result);
})
blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const decodedToken = jwt.verify(request.token, process.env.SECRET)



  if (!request.token || !decodedToken) {

    return response.status(401).json({
      error: "token missing or invalid"
    })
  }

  const blog = await Blog.findById(id)
  if (blog.user[0].toString() == decodedToken.id.toString()) {
    let res = await Blog.deleteOne({
      "_id": id
    });
    response.json(res);
  } else {
    response.status(401).send("You are not authorized to delete this blog")
  }



})
/*
blogRouter.get('/:id', (request, response) => {
    const id = request.params.id.toString();
  Blog
    .find({_id:id})
    .then(blogs => {
      response.json(blogs)
    })
})*/
blogRouter.post('/', async (request, response) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch (err) {
    console.log(err,"====================");
  }


  if (!request.token || !decodedToken) {
    console.log("invalid")
    console.log("--------------------------------------------------");
    return response.status(401).json({
      error: "token missing or invalid"
    })
  } else {
    const user = await User.findById(decodedToken.id)
    let newblog = {
      ...request.body,
      user: user._id
    };
    if (!request.body.likes) {
      newblog = {
        ...newblog,
        likes: 0,
      }

    }
    newblog = new Blog(newblog);
    if (!request.body.title && !request.body.url) {
      response.status(400).json("Bad Request")
    } else {
        
       
        
      let result = await newblog.save()
      user.blogs = user.blogs.concat(result._id);
      await user.save()
        result = await Blog.findOne({_id:result._id}).populate('user', {
        username: 1,
        name: 1
        });
    response.status(201).json(result);
        
    }
  }
})

blogRouter.put('/:id/comments/', async (request, response) => {
  let id = request.params.id.toString();
  const blog = request.body;
  let res = await Blog.update({
    "_id": id
  },
   { $push: { "comments": blog.comment } }
)
  response.send(blog);

})


blogRouter.put('/:id', async (request, response) => {
  let id = request.params.id.toString();
  const blog = request.body;
  let res = await Blog.update({
    "_id": id
  }, {
    $set: {
      "likes": blog.likes
    }
  })
  response.send(blog);

})






module.exports = blogRouter;