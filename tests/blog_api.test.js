const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app);
let initialBlogs = 1;


describe("blog test",()=>{
    test('blogs are returned for a get request', async () => {
    const response = await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)

})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(3);

})
test('all blogs have unique property id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined();

})
test('post really posts the blog', async () => {
    const newBlog = {
        title: "amankapoor's blog",
        author: "amankapoor's blog",
        url: "amankapoor's blog",
        likes:123
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization','bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtYW5rYXBvb3IiLCJpZCI6IjVlZWI1OGViOWJjZGNlNDMxMDY3NjgyMCIsImlhdCI6MTU5MjQ4MjA4Nn0.RMTslXGks0Iw8KNeCNGc69AdlwccLKrDQzGrbR9Ypts')
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.length;
    expect(contents).toBe(3);

})
test('requests with no token are rejected', async () => {
    const newBlog = {
        title: "amankapoor's blog",
        author: "amankapoor's blog",
        url: "amankapoor's blog",
        likes:123
    }
   let res= await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)


})
test('like defaults to 0', async () => {
    const newBlog = {
        title: "New blog",
        author: "xd yz",
        url: "https://www.like.com",
        userId:"5ee8d93dd0d9352dc4a1f134"
    }
    let likes=0
    if(newBlog.likes){
        likes=newBlog.likes;
    }else{
        likes=0
    }
    let response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toBe(likes);

})
test('blogs without title and url are rejected', async () => {
    const newBlog = {
        author: "ab yz",
        likes:52,
        userId:"5ee8d93dd0d9352dc4a1f134"
        
    }
    let response=await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(400);

})})




describe('user test',()=>{
    test("invalid users are not created",async ()=>{
        const newUser = {
            name:"abc def",
            username:"ab",
            password:"1234"
        }
        let result = await api.post("/api/users").send(newUser);
        expect(result.body).toContain("The password/username is too short. The password/username needs to be more than 3 characters.")
        })
        
})


afterAll(() => {
  
    mongoose.connection.close()
})