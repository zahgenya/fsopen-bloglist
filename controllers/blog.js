const blogsRouter = require('express').Router();
const { request } = require('express');
const Blogs = require('../models/blogs');

blogsRouter.get('/', async (request, response) => {
  const blog = await Blogs.find({});
  response.json(blog);
});

blogsRouter.get('/:id', (request, response, next) => {
  Blogs.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

blogsRouter.post('/', (request, response, next) => {
  const body = request.body;

  const blog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog);
    })
    .catch((error) => {
      next(error);
    });
});

blogsRouter.delete('/:id', (request, response, next) => {
  Blogs.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = blogsRouter;
