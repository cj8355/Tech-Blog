//File that connects to the  models
const User = require('./User');
const Comment = require('./comment');
const BlogPost = require('./blogPost');

//  BlogPost.hasMany(Comment, {
//    foreignKey: 'blogPost_id',
//  });

// Comment.belongsTo(BlogPost, {
//  foreignKey: 'blogPost_id',
//  });

// Create associations between the models
// User-Post relationship
User.hasMany(BlogPost, {
  foreignKey: 'user_id'
});
//Post-User relationship
BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

// Comment-User relationship
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
  hooks:true
});

// Comment-Post relationship
Comment.belongsTo(BlogPost, {
  foreignKey: 'blogPost_id',
  onDelete: 'cascade',
  hooks: true
});

// User-Comment relationsihp
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
  hooks:true
});

// Post-Comment relationship
BlogPost.hasMany(Comment, {
  foreignKey: 'blogPost_id',
  onDelete: 'cascade',
  hooks:true
})

module.exports = { User, Comment, BlogPost };