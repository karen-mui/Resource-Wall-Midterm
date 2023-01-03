const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  if (!req.session.userId) {
    res.status(401).send('Please login.');
  } else {
    const templateVars = {
      activeUser: req.session.userId
    }
    res.render("newResource", templateVars)
  }
})

router.post('/', (req, res) => {
  db.query(`SELECT * FROM topics WHERE topic = $1;`, [req.body.topic_id])
    .then(result => {
      if (result.rows[0]) {
        db.query(`INSERT INTO posts (owner_id, topic_id, title, description, content_url, image_url) VALUES ($1, $2, $3, $4, $5, $6);`, [req.session.userId.id, result.rows[0].id, req.body.title, req.body.description, req.body.content_url, req.body.image_url])
        .then(result => {
          res.redirect('/');
        })
        .catch(err => {
          console.log(err);
        })
      } else if (!result.rows[0]) {
        db.query(`INSERT INTO topics (topic) VALUES ($1);`, [req.body.topic_id])
        .then(result => {
          db.query(`SELECT * FROM topics WHERE topic = $1;`, [req.body.topic_id])
          .then(result => {
            db.query(`INSERT INTO posts (owner_id, topic_id, title, description, content_url, image_url) VALUES ($1, $2, $3, $4, $5, $6);`, [req.session.userId.id, result.rows[0].id, req.body.title, req.body.description, req.body.content_url, req.body.image_url])
            .then(result => {
              res.redirect('/');
            })
            .catch(err => {
              console.log(err);
            });
          })
        })
      }
    })
})

module.exports = router;
