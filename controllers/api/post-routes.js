const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all blog posts
router.get('/', (req, res) => {
    console.log('======================');
    BlogPost.findAll({
        attributes: [
            'id',
            'title',
            'createdAt',
            'content'
        ],
      order: [['createdAt', 'DESC']],
      include: [
        // Comment model here -- attached username to comment
        {
          model: User,
          attributes: ['username']
      },
      {
          model: Comment,
          attributes: ['id', 'content', 'blogPost_id', 'user_id', 'createdAt'],
          include: {
              model: User,
              attributes: ['username']
          },
        }
      ]
    })
      .then(dbBlogPostData => res.json(dbBlogPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Get a blogpost by its id
  router.get('/:id', async (req, res) => {
    // If the user is not logged in, redirect the user to the login page
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // If the user is logged in, allow them to view the gallery
      try {
        const dbBlogPostData = await BlogPost.findByPk(req.params.id, {
          include: [
            {
                model: User,
                attributes: ['username']
              },
              {
                  model: BlogPost,
                  attributes: ['id', 'title', 'createdAt', 'content']
              },
            {
              model: Comment,
              attributes: [ 
                'id',
                'content',
        
              ],
            },
          ],
        });
        const blogPost = dbBlogPostData.get({ plain: true });
        res.render('blogPost', { blogPost, loggedIn: req.session.loggedIn });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  });

  // Create a new blog post
router.post('/', withAuth, (req, res) => {
  console.log(req.body);
    BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    })
      .then(dbBlogPostData => res.json(dbBlogPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Updates a blog post based off its id
router.put('/:id', withAuth, (req, res) => {
    BlogPost.update({
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(dbBlogPostData => {
        if (!dbBlogPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbBlogPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Deletes a blog post by its id
  router.delete('/:id', withAuth, (req, res) => {
    BlogPost.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbBlogPostData => {
        if (!dbBlogPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbBlogPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;