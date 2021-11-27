const router = require('express').Router();
const sequelize = require('../config/connection');
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('Dashboard');
    BlogPost.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'createdAt',
        'content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'blogPost_id', 'user_id', 'createdAt'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbBlogPostData => {
        // serialize data before passing to template
        const blogPosts = dbBlogPostData.map(blogPost => blogPost.get({ plain: true }));
        res.render('dashboard', { blogPosts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    BlogPost.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'createdAt',
        'content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'blogPost_id', 'user_id', 'createdAt'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbBlogPostData => {
        if (!dbBlogPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const blogPosts = dbBlogPostData.get({ plain: true });

        res.render('edit-post', {
            blogPosts,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/create/', withAuth, (req, res) => {
    BlogPost.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'createdAt',
        'content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'blogPost_id', 'user_id', 'createdAt'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbBlogPostData => {
        // serialize data before passing to template
        const blogPosts = dbBlogPostData.map(post => post.get({ plain: true }));
        res.render('create-post', { blogPosts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;