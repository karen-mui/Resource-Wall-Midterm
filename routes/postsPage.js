const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/post/:id', (req, res) => {
  // function to get post and its comments, ratings, likes
  db.getPost()
    .then(post => res.send({post}))
    .catch(e => {
      console.error(e);
      res.send(e)
    })
  });

module.exports = router;
