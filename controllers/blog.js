const blogsRouter = require('express').Router();
const { request } = require('express');
const Blogs = require('../models/blogs');

blogsRouter.get('/', (request, response) => {
  Blogs.find({}).then((blog) => {
    response.json(blog);
  });
});

blogsRouter.get('/:id', (request, response) => {
  Blogs.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log('error:', error.message);
    });
});

blogsRouter.post('/', (request, response) => {
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
      response.json(savedBlog);
    })
    .catch((error) => {
      console.log('error:', error.message);
    });
});

blogsRouter.delete('/:id', (request, response) => {
  Blogs.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log('error:', error.message);
    });
});

module.exports = blogsRouter;
