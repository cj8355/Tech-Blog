const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all the comments
router.get('/', (req, res) => {
    Comment.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//Create a new comment
router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    console.log(req.body);
    console.log(req.session);
    Comment.create({
      content: req.body.content,
      blogPost_id: req.body.blogPost_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

//Delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;