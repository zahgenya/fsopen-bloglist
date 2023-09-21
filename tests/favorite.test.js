const listHelper = require('../utils/list_helper');

describe('most liked blog', () => {
  const blogsArray = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
    {
      title: 'Destructuring props in react',
      author: 'Bob Criswell',
      likes: 10,
    },
    {
      title: 'Prototyping in javascript',
      author: 'Martin Morgan',
      likes: 15,
    },
  ];

  test('when list has 3 blogs, find most liked one', () => {
    const result = listHelper.favoriteBlog(blogsArray);
    console.log(result);
    console.log(`THIS IS LOG OF MOST LIKED:`, blogsArray[2]);
    expect(result).toEqual(blogsArray[2]);
  });
});
