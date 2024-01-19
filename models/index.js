const User = require('./User');
const Dashboard = require('./Dashboard');
const Post = require('./Post');
const Comment = require('./Comment');

// Post model
Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

// User model
User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});




module.exports = { User, Dashboard, Post, Comment };
