const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
    comments:[],
  user:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
  ],
   
})


const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://fullstack:123123123@cluster0-ryzsp.mongodb.net/bloglist?retryWrites=true&w=majority'
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports= Blog;