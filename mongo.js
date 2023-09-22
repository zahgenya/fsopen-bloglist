const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://zahgenya:${password}@cluster0.znpepqq.mongodb.net/TestBloglistApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blogs = mongoose.model('Blogs', blogSchema);

const blog = new Blogs({
  title: 'Destructuring props in react',
  author: 'Bob Criswell',
  url: 'www.bobblogs.com',
  likes: 21,
});

blog.save().then((result) => {
  console.log('blog saved!');
  mongoose.connection.close();
});
