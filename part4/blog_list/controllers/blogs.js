
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.delete('/:id', (request, response) => {
  Blog
    .findByIdAndDelete(request.params.id)
      .then(() => response.status(204).end())
})

blogRouter.put('/:id', (request, response) => {
  const id = request.params.id
  const blogPost = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  Blog.findByIdAndUpdate(id, blogPost, { new: true })
    .then(updatedBlogPost => {
      response.json(updatedBlogPost)
    })
})
  
blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter
