const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/:id', (req, res) => {
  db.query(`
  SELECT (posts.*) FROM posts
  FULL OUTER JOIN likes ON post_id = posts.id
  WHERE owner_id = $1
  OR likes.user_id = $1
  GROUP BY posts.id;
  `, [req.params.id])
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
