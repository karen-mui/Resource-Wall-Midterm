const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const functions = require('../db/queries/functions')

console.log(functions);

router.get('/:id', (req, res) => {
  db.query(`SELECT (posts.*) FROM posts WHERE posts.id = $1`, [req.params.id])
  .then(result => {
    const templateVars = result.rows[0];
    templateVars.activeUser = req.session.userId;
    templateVars.postId = req.params.id;
    res.render('postsPage', templateVars);
  })
  .catch(err => {
    console.error(err);
    res.send(err);
    });
});

router.post('/:id/rate', (req, res) => {
 db.query(`INSERT INTO ratings (user_id, post_id, rating) VALUES ($1, $2, $3);`, [req.session.userId.id, req.params.id, req.body.rating])
    .then(result => {
      res.redirect('/:id')
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
});

// /POST/:ID/COMMENT => comment resource
router.post('/post/:id/comment', (req, res) => {
  const user = req.session.userId;
  console.log(req.body);
  const newComment = {
    user_id: user.id,
    post_id: req.body.post_id,
    content: req.body.content,
    date_posted: req.headers["Date"]
  };
  console.log(newComment)
  functions.addComment(newComment)
    .then(comment => {
      res.send(comment);
      res.redirect('/:id')
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
});

router.post('/:id/like', (req, res) => {
  db.query(`SELECT * FROM likes WHERE user_id = $1 AND post_id = $2`, [req.session.userId.id, req.params.id])
    .then(result => {
      if (!result.rows[0]) {
        // If the user hasnt liked the post it will add a like to the db
        db.query(`INSERT INTO likes (user_id, post_id) VALUES ($1, $2);`, [req.session.userId.id, req.params.id])
          .then(result => {
            res.redirect('/:id')
          })
      } else if (result.rows[0]) {
        // If the user has liked the post it with delete the like from the db
        db.query(`DELETE FROM likes WHERE user_id = $1 and post_id = $2);`, [req.session.userId.id, req.params.id])
          .then(result => {
            res.redirect('/:id')
          })
      }
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;
