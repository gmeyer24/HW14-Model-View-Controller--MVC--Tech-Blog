// dont run or use

const { Post } = require('../models');

const postdata = [
  {
    title: 'Why MVC is so important',
    posted_date:"2024-01-16",
    author: 'Gavin',
    contents: 'This is the most important.',
    blog_id: 1,
  },
  {
    title: 'Second Post',
    posted_date:"2024-01-16",
    author: 'Gavin',
    contents: 'Follow this post for tips on coding.',
    blog_id: 2,
  },
 
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;