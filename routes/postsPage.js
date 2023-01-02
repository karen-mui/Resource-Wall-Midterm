const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/:id', (req, res) => {
  // function to get post and its comments, ratings, likes
  db.query(`SELECT * FROM posts WHERE id = $1`, [req.params.id])
    .then(result => {
      const templateVars = result.rows[0];
      templateVars.activeUser = req.session.user_id;
      res.render('postsPage', templateVars);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    })
});

router.post('/:id/comment', (req, res) => {

});

router.post('/:id/rating', (req, res) => {

});

router.post('/:id/like', (req, res) => {

});
module.exports = router;
