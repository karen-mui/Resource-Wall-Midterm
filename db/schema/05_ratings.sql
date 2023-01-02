

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  rating INTEGER NOT NULL
);
