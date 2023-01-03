const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  if (!req.session.userId) {
    res.status(401).send('Login to access page');
  } else {
    db.query(`SELECT * FROM posts LEFT JOIN users ON owner_id = users.id WHERE owner_id = $1 GROUP BY posts.id, users.id`, [req.session.userId.id])
    .then(result => {
      console.log(result.rows);
      // << create html elements for each result array item >> //
      res.render('usersPage');
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    })
  }
});

module.exports = router;
