const router = require('express').Router();
const sequelize = require('../config/connection');
const { BlogPost, Comment, User } = require('../models');

// GET all blog posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogPostData = await BlogPost.findAll({
      include: [
        {
          model: Comment,
          attributes: ['content'],
        },
        {
        model: User,
        attributes: ['username'],
        }
      ],
    });

    const blogPosts = dbBlogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
console.log(blogPosts);
    res.render('homepage', {
      blogPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog post
router.get('/blogPost/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the blogposts
    try {
      const dbBlogPostData = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: [
              'id',
              'content',
              'createdAt',
      
            ],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ],
      });
      const blogPost = dbBlogPostData.get({ plain: true });
      console.log(blogPost);
      res.render('single-post', { blogPost, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      console.log("Apple");
      res.status(500).json(err);
    }
  }
});

// GET one comment
router.get('/comment/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the comment
    try {
      const dbCommentData = await Comment.findByPk(req.params.id);

      const comment = dbCommentData.get({ plain: true });

      res.render('comment', { comment, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;