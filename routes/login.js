const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db/connection');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['uBjq2k4', 'k23is3N']
}));

router.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/');
  } else {
    res.render('login')
  }
})

router.post('/', (req, res) => {
  db.query(`SELECT * FROM users WHERE email = $1;`, [req.body.email])
    .then(result => {
      if (result.rows[0] && bcrypt.compareSync(req.body.password, result.rows[0].password)) {
        req.session.userId = result.rows[0];
        res.redirect('/');
      } else {
        res.send('Invalid Credentials');
      }
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;
