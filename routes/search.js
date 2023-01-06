const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  db.query(`
  SELECT * FROM topics WHERE topic LIKE '%' || $1 || '%'`, [req.query.searchResources])
    .then(result => {
      console.log('req.params:', req.params);
      res.render('searchResults', { activeUser: req.session.userId, searchedTopic: result.rows[0]});
    })
    .catch(err => {
      console.log(err);
    });
})

module.exports = router;
