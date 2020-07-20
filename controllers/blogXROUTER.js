const blogXROUTER = require('express').Router()

blogXROUTER.get('/',  (request, response) => {

  response.json("result");
})



module.exports = blogXROUTER;