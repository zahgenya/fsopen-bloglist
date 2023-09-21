const list_helper = require('../utils/list_helper');

describe('find author fith most liked blog', () => {
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
    {
      title: 'How to use lodash',
      author: 'Martin Morgan',
      likes: 22,
    },
  ];

  test('when list has 4 blogs, find author with most liked blog', () => {
    const result = list_helper.mostLikes(blogsArray);
    console.log(result);
    expect(result).toEqual({
      author: 'Martin Morgan',
      likes: 32,
    });
  });
});
