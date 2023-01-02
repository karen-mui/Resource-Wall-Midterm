const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['uBjq2k4', 'k23is3N']
}));

router.post('/', (req, res) => {
  req.session = null;
  res.redirect('/login');
})

module.exports = router;
