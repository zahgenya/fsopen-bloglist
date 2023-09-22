const blogsRouter = require('express').Router();
const { request } = require('express');
const Blogs = require('../models/blogs');

blogsRouter.get('/', async (request, response) => {
  const blog = await Blogs.find({});
  response.json(blog);
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blogs.findById(request.params.id);
    if (note) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const blog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blogs.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
