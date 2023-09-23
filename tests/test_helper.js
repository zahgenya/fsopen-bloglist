const Blogs = require('../models/blogs');

const initialBlogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'www.edsgerblogs.com',
    likes: 15,
  },
  {
    title: 'Destructuring props in react',
    author: 'Bob Criswell',
    url: 'www.bobblogs.com',
    likes: 17,
  },
];

const nonExistingId = async () => {
  const blog = new Blogs({ title: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blogs.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
