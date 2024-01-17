const { Blog } = require('../models');

const blogdata = [
  {
    title: 'Why MVC is so important',
    posted_date:"2024-01-16",
    author: 'Gavin',
    contents: 'This is the most important.'
  },
  {
    title: 'Coding for Beginner',
    posted_date: "2024-01-16",
    author: 'Gavin',
    contents: 'Follow this post for tips on coding.'
  },
 
];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;