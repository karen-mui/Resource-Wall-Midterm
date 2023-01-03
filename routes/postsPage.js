const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/:id', (req, res) => {
  db.query(`SELECT * FROM posts WHERE id = $1`, [req.params.id])
  .then(result => {
    const templateVars = result.rows[0];
    templateVars.activeUser = req.session.user_id;
    res.render('postsPage', templateVars);
  })
  .catch(err => {
    console.error(err);
    res.send(err);
    });
});

// /POST/:ID/RATE => rate resource
router.post('/post/:id/rate', (req, res) => {
  const userId = req.session.userId;
  const newRating = {
    user_id: userId,
    post_id: req.body.post_id,
    rating: req.body.rating
  };
  // function to insert new rating to the table
  db.addRating(newRating)
    .then(rating => {
      res.send(rating);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

// /POST/:ID/COMMENT => comment resource
router.post('/post/:id/comment', (req, res) => {
  const userId = req.session.userId;
  const newComment = {
    user_id: userId,
    post_id: req.body.post_id,
    content: req.body.content,
    date_posted: req.body.date_posted
  };
  // function to insert new comment to the table
  db.addComment(newComment)
    .then(comment => {
      res.send(comment);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

// /POST/:ID/LIKE => like resource
router.post('/post/:id/like', (req, res) => {
  const userId = req.session.userId;
  const newLike = {
    user_id: userId,
    post_id: req.body.post_id,
    liked: true
  };
  // function to insert new like to the table
  db.addLike(newLike)
    .then(like => {
      res.send(like);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

module.exports = router;
