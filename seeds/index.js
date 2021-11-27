const sequelize = require('../config/connection');
const seedBlogPosts = require('./blogPostData');
const seedComments = require('./commentData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedBlogPosts();

  await seedComments();



  process.exit(0);
};

seedAll();