const { BlogPost } = require('../models');

const blogPostdata = [
  {
    title: 'Why MVC is important',
    content: 'MVC allwos developers to maintain a true seperation of concerns.',
    user_id: 1
  },
  {
    title: 'CSS',
    content: 'Using css with bootstrap allows for the use of less code.',
    user_id: 1
  },
  {
    title: 'Authentication vs. Authorization',
    content: 'Authentication is not the same as authorization.',
    user_id: 1
  },
];

const seedBlogPosts = () => BlogPost.bulkCreate(blogPostdata);

module.exports = seedBlogPosts;