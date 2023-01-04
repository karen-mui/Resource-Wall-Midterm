const db = require('../connection');

// Insert rating to the database
const addRating = function(rating) {
  return db
    .query(`
  INSERT INTO ratings (user_id, post_id, rating) VALUES ($1, $2, $3)
  RETURNING *;`,
      [rating.user_id, rating.post_id, rating.rating])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addRating = addRating;

// Insert comment to the database
const addComment = function(comment) {
  return db
    .query(`
  INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3)
  RETURNING *;`,
      [comment.user_id, comment.post_id, comment.content])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addComment = addComment;

// Insert comment to the database
const addLike = function(like) {
  return db
    .query(`
  INSERT INTO likes (user_id, post_id, liked) VALUES ($1, $2, $3)
  RETURNING *;`,
      [like.user_id, like.post_id, like.liked])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addLike = addLike;
