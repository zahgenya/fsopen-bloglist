const list_helper = require('../utils/list_helper');
const _ = require('lodash');

describe('author with most blogs', () => {
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
      likes: 12,
    },
  ];

  test('when list has 4 blogs, find author with biggest amount of blogs', () => {
    const result = list_helper.coolesAuthorFinder(blogsArray);
    console.log(result);
    expect(result).toEqual({
      author: 'Martin Morgan',
      blogs: 2,
    });
  });
});
