const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);

const Blogs = require('../models/blogs');

beforeEach(async () => {
  await Blogs.deleteMany({});
  console.log('cleared!');

  await Blogs.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('id is stored in .id property', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain('Canonical string reduction');
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Prototyping in javascript',
    author: 'Martin Morgan',
    url: 'www.martinblogs.com',
    likes: 10,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain('Prototyping in javascript');
});

test('blog without content is not added', async () => {
  const newBlog = {
    title: 1,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('blog without likes imput should return 0 likes as default', async () => {
  const newBlog = {
    title: "Scopes in javascript",
    author: "Bill Gates",
    url: "www.microsoft.com",
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map((b) => b.likes)
    expect(likes).toEqual(expect.arrayContaining([0]));
})

afterAll(async () => {
  await mongoose.connection.close();
});
