const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  db.query(`SELECT * FROM posts LEFT JOIN topics ON topic_id = topics.id ORDER BY date_posted;`)
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
