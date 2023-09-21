const Blogs = require('../models/blogs');
const _ = require('lodash');

const dummy = (blogs) => {};

const blogsInDb = (props) => {
  const blog = props;
  return blog.map((blog) => blog.toJSON());
};

const totalLikes = (props) => {
  const blogs = props;
  let total = 0;

  blogs.forEach((blog) => {
    total += blog.likes;
  });

  return total;
};

const favoriteBlog = (blogsArray) => {
  return blogsArray.reduce((maxLikes, currentBlog) => {
    return currentBlog.likes > maxLikes.likes ? currentBlog : maxLikes;
  }, blogsArray[0]);
};

const coolesAuthorFinder = (blogsArray) => {
  const blogsCounts = _.countBy(blogsArray, 'author');
  const coolestAuthor = _.maxBy(
    Object.keys(blogsCounts),
    (author) => blogsCounts[author]
  );

  return ({
    author: coolestAuthor,
    blogs: blogsCounts[coolestAuthor],
  });
};

module.exports = {
  dummy,
  blogsInDb,
  totalLikes,
  favoriteBlog,
  coolesAuthorFinder,
};
