const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { createPostElement } = require('../scripts/client');

router.get('/', (req, res) => {
  if (!req.session.userId) {
    res.status(401).send('Login to access page');
  } else {
    db.query(`SELECT * FROM posts LEFT JOIN users ON owner_id = users.id WHERE owner_id = $1 GROUP BY posts.id, users.id`, [req.session.userId.id])
    .then(result => {
      result.rows.forEach(data => {

      })
    })
    .then(
      res.render('usersPage', { activeUser: req.session.userId })
    )
    .catch(err => {
      console.error(err);
      res.send(err)
    })
  }
});

module.exports = router;
