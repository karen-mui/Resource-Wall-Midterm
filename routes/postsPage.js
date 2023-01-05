const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/:id', (req, res) => {
  if (!req.session.userId) {
    db.query(`SELECT * FROM posts WHERE id = $1;`, [req.params.id])
      .then(result => {
        const templateVars = result.rows[0];
        templateVars.activeUser = req.session.userId;
        templateVars.postId = req.params.id;
        res.render('postsPage', templateVars);
      })
  } else {
    db.query(`SELECT * FROM posts WHERE posts.id = $1;`, [req.params.id])
    .then(result => {
      const templateVars = result.rows[0];
      db.query(`SELECT likes.id as liked FROM likes LEFT JOIN posts on post_id = posts.id WHERE posts.id = $1 and user_id = $2;`, [req.params.id, req.session.userId.id])
        .then(result => {
          templateVars.liked = result.rows[0];
          db.query(`SELECT rating FROM ratings LEFT JOIN posts on post_id = posts.id WHERE posts.id = $1 and user_id = $2;`, [req.params.id, req.session.userId.id])
            .then(result => {
              if (result.rows[0]) {
                templateVars.rating = result.rows[0].rating;
              } else {
                templateVars.rating = result.rows[0];
              }
              templateVars.activeUser = req.session.userId;
              templateVars.postId = req.params.id;
              console.log(templateVars);
              res.render('postsPage', templateVars);
            })
        })
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
  }
});

router.post('/:id/rate', (req, res) => {
  db.query(`SELECT * FROM ratings WHERE user_id = $1 AND post_id = $2;`, [req.session.userId.id, req.params.id])
    .then(result => {
      if (!result.rows[0]) {
        db.query(`INSERT INTO ratings (user_id, post_id, rating) VALUES ($1, $2, $3);`, [req.session.userId.id, req.params.id, req.body.rating])
          .then(result => {
            res.redirect(`/posts/${req.params.id}`)
          })
      } else if (result.rows[0]) {
        db.query(`DELETE FROM ratings WHERE user_id = $1 and post_id = $2;`, [req.session.userId.id, req.params.id])
          .then(result => {
            db.query(`INSERT INTO ratings (user_id, post_id, rating) VALUES ($1, $2, $3);`, [req.session.userId.id, req.params.id, req.body.rating])
              .then(result => {
                res.redirect(`/posts/${req.params.id}`)
              })
          })
      }
    })
});

router.post('/:id/comment', (req, res) => {
  db.query(`INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3)`, [req.session.userId.id, req.params.id, req.body.commentContent])
    .then(result => {
      res.redirect(`/posts/${req.params.id}`);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
});

router.post('/:id/like', (req, res) => {
  db.query(`SELECT * FROM likes WHERE user_id = $1 AND post_id = $2;`, [req.session.userId.id, req.params.id])
    .then(result => {
      if (!result.rows[0]) {
        // If the user hasnt liked the post it will add a like to the db
        db.query(`INSERT INTO likes (user_id, post_id) VALUES ($1, $2);`, [req.session.userId.id, req.params.id])
          .then(result => {
            res.redirect(`/posts/${req.params.id}`)
          })
      } else if (result.rows[0]) {
        // If the user has liked the post it with delete the like from the db
        db.query(`DELETE FROM likes WHERE user_id = $1 and post_id = $2;`, [req.session.userId.id, req.params.id])
          .then(result => {
            res.redirect(`/posts/${req.params.id}`)
          })
      }
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;
