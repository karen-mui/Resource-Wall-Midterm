const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.status(401).send('Login to access page');
  } else {
    // function to get user's own resources and liked resources
    db.getMyResources(userId)
    .then(myResources => res.send({myResources}))
    .catch(e => {
      console.error(e);
      res.send(e)
    })
  }
});

module.exports = router;
