const { Post } = require('../models');

const postdata = [
  {
    author: 'Gavin',
    contents: 'This is the most important.',
    blog_id: 1,
  },
  {
    author: 'Gavin',
    contents: 'Follow this post for tips on coding.',
    blog_id: 2,
  },
 
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;