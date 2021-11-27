const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'user',
        key: 'id'
    }
},

blogPost_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'blogPost',
        key: 'id'
    }
}
},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;