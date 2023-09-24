const blogsRouter = require('express').Router();
const Blogs = require('../models/blogs');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blog = await Blogs.find({}).populate('user', { username: 1, name: 1 });
  response.json(blog);
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blogs.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  const user = await User.findById(body.userId);

  const blog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blogs.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blogs.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
