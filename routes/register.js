const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/', (req, res) => {
  console.log(req.body);
})

module.exports = router;
