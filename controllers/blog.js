const blogsRouter = require('express').Router();
const Blogs = require('../models/blogs');
const User = require('../models/user');

const { userExtractor } = require('../utils/middleware');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

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

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blogs({
    title,
    author,
    url,
    likes: likes ? likes : 0,
  });

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' });
  }

  blog.user = user._id;

  const createdBlog = await blog.save();

  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();

  response.status(201).json(createdBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blogs.findById(request.params.id);

  const user = request.user;

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' });
  }

  user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString());

  await user.save();
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
