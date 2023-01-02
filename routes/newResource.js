const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/newresource', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.status(401).send('Please login.');
  } else {
    const templateVars = {
      //
    }
    res.render("new_resource", templateVars)
  }
})

router.post('/newresource', (req, res) => {
  const userId = req.session.userId;
  const newResource = {
    owner_id: userId,
    topic_id: req.body.topic_id,
    title: req.body.title,
    description: req.body.description,
    content_url: req.body.content_url,
    img_url: req.body.img_url,
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
