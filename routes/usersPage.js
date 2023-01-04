const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  if (!req.session.userId) {
    res.status(401).send('Login to access page');
  } else {
    res.render('usersPage', { activeUser: req.session.userId })
  }
});

module.exports = router;
