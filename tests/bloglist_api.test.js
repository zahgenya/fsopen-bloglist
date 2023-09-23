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

describe('viewing and accesing saved blogs', () => {
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
});

describe('adding new blogs', () => {
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
      title: 'Scopes in javascript',
      author: 'Bill Gates',
      url: 'www.microsoft.com',
    };

    await api.post('/api/blogs').send(newBlog).expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    const likes = blogsAtEnd.map((b) => b.likes);
    expect(likes).toEqual(expect.arrayContaining([0]));
  });
});

describe('deletion of blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating blogs', () => {
  test('update likes in blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        likes: 32,
      })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

    expect(updatedBlog.likes).toBe(32);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
