const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('posts have correct length', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(response.body.length)
})

test('blog post identifier is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('POST request creates a new blog post', async () => {
    const posts = await api.get('/api/blogs')
    const posting = {
        "title": "test",
        "author": "post",
        "url": "length + 1",
        "likes": 14
    }
    await api.post('/api/blogs')
        .send(posting)
        .expect(201)
    const addedPosts = await api.get('/api/blogs')
    expect(addedPosts.body.length).toBe(posts.body.length + 1)
})

test('Delete the last added user', async () => {
    const posts = await api.get('/api/blogs')
    await api.delete(`/api/blogs/${posts.body[posts.body.length - 1].id}`)
        .expect(204)
    const afterDelete = await api.get('/api/blogs')
    expect(afterDelete.body.length).toBe(posts.body.length - 1)
})

test('Update works', async () => {
    const firstPost = await api.get('/api/blogs')
    const update = firstPost.body[0]
    update.likes = 999

    await api.put(`/api/blogs/${firstPost.body[0].id}`)
        .send(update)
        .expect(200)
    
    const afterUpdate = await api.get('/api/blogs')
    expect(afterUpdate.body[0].likes).toBe(999)
})

afterAll(async () => {
    await mongoose.connection.close()
})