

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  content VARCHAR(255) NOT NULL,
  date_posted TIMESTAMP NOT NULL
);
