const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/:id', (req, res) => {
  db.query(`SELECT * FROM posts WHERE id = $1`, [req.params.id])
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id/comments', (req, res) => {
  db.query(`SELECT comments.*, users.name as commenter_name FROM comments LEFT JOIN users ON user_id = users.id LEFT JOIN posts ON post_id = posts.id WHERE posts.id = $1;`, [req.params.id])
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
