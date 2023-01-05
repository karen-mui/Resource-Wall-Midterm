const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/:topic', (req, res) => {
  db.query(`SELECT * FROM topics WHERE topic = $1;`, [req.params.topic])
    .then(result => {
      console.log(result.rows, req.params.topic);
      res.render('searchResults', { activeUser: req.session.userId, searchedTopic: result.rows[0] });
    })
    .catch(err => {
      console.log(err);
    });
})

module.exports = router;
