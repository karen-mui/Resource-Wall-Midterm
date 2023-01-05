const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  res.render('searchResults', { activeUser: req.session.userId, topicSearched: req.body.searchResources });
})

module.exports = router;
