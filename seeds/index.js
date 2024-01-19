const sequelize = require('../config/connection');
const seedBlog = require('./blogData');
const seedPosts = require('./postData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
  await seedBlog();

  await seedPosts();

  process.exit(0);
};

seedAll();
