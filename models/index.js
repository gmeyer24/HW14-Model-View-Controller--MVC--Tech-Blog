const User = require('./User');
const Gallery = require('./Gallery');
const Painting = require('./Painting');
const Dashboard = require('./Dashboard');
const Blog = require('./Blog');
const Post = require('./Post');
const Comment = require('./Comment');

Gallery.hasMany(Painting, {
  foreignKey: 'gallery_id',
});

Painting.belongsTo(Gallery, {
  foreignKey: 'gallery_id',
});

Blog.hasMany(Post, {
  foreignKey: 'blog_id',
});

Post.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

// Blog model
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

// User model
User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});




module.exports = { User, Gallery, Painting, Dashboard, Blog, Post, Comment };