const listHelper = require('../utils/list_helper');

describe('most liked blog', () => {
  const blogsArray = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 15,
    },
    {
      title: 'Destructuring props in react',
      author: 'Bob Criswell',
      likes: 17,
    },
    {
      title: 'Prototyping in javascript',
      author: 'Martin Morgan',
      likes: 10,
    },
  ];

  test('when list has 3 blogs, find most liked one', () => {
    const result = listHelper.favoriteBlog(blogsArray);
    console.log(result);
    expect(result).toEqual(blogsArray[1]);
  });
});
