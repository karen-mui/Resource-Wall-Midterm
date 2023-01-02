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
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('register')
  }
})

router.post('/', (req, res) => {
  if (req.body.email && req.body.password && req.body.email) {
    db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email])
      .then(result => {
        if (!result.rows[0]) {
          db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 10)])
            .then((result) => {
              db.query(`SELECT id FROM users WHERE email = $1`, [req.body.email])
              .then(result => {
                req.session.user_id = result.rows[0];
                res.redirect('/');
              })
            })
            .catch(err => {
              console.log(err.message)
            })
        } else {
          res.send('Invalid Credentials');
        }
      })
      .catch(err => {
        console.log(err.message);
      })
  } else {
    res.send('Invalid Credentials');
  }
})

module.exports = router;
