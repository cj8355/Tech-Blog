// Creating fake comments for the blog posts
const { Comment } = require('../models');

const commentdata = [
  {
    content: 'Great Post',
    blogPost_id: 1,
  },
  {
    content: 'Interesting',
    blogPost_id: 2,
  },
  {
    content: 'Makes sense',
    blogPost_id: 3,
  },
 
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;