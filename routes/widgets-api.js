/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { render } = require('ejs');
const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `SELECT * FROM widgets`;
  console.log(query);
  db.query(query)
    .then(data => {
      const widgets = data.rows;
      res.json({ widgets });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// / => homepage ... view all resources (like Pinterest)

// /LOGIN

// /LOGOUT

// /REGISTER => register a new user

// /SEARCH

// /NEWRESOURCE => post a new resource
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

// /USERS/:id => view list of your own resources and resources you've liked
router.get('/users/:id', (req, res) => {
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

// /POST/:ID => view description page for a resource
router.get('/post/:id', (req, res) => {
  // function to get post and its comments, ratings, likes
  db.getPost()
    .then(post => res.send({post}))
    .catch(e => {
      console.error(e);
      res.send(e)
    })
  });

// /POST/:ID/RATE => rate resource

// /POST/:ID/COMMENT => rate resource

// /POST/:ID/LIKE => like resource


module.exports = router;
