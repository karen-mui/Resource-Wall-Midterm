const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  if (!req.session.userId) {
    res.status(401).send('Please login.');
  } else {
    const templateVars = {
      activeUser: req.session.userId
    }
    res.render("newResource", templateVars)
  }
})

router.post('/', (req, res) => {
  const userId = req.session.userId;
  const newResource = {
    owner_id: userId,
    topic_id: req.body.topic_id,
    title: req.body.title,
    description: req.body.description,
    content_url: req.body.content_url,
    image_url: req.body.image_url,
    date_posted: req.body.date_posted
  }
  // function to insert new resource into table
  db.addResource(newResource)
    .then(resource => {
      res.send(resource);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  // redirection to which page? => res.redirect()
})

module.exports = router;
