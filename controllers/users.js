const userRouter = require('express').Router()
const User = require('../models/Users')
const bcrypt = require('bcrypt');


userRouter.get('/', async (request, response) => {
    let res = await User.find({}).populate('blogs',{title:1,author:1,url:1,likes:1,id:1});
    response.send(res);

})
userRouter.post('/', async (request, response) => {
    const body = request.body;
    if (body.password.length < 4 || body.username.length < 4) {
        response.status(400).json("The password/username is too short. The password/username needs to be more than 3 characters.").end();
    } else {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);
        const user = new User({
            name: body.name,
            username: body.username,
            passwordHash
        })
        try {
            const savedUser = await user.save();
            response.json(savedUser);
        }
        catch(err){
            response.status(400).send("username must be unique")
        }

        
    }
})

module.exports = userRouter;