

DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id),
  topic_id INTEGER REFERENCES topics(id),
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  content_url VARCHAR(255) NOT NULL,
  date_posted TIMESTAMP NOT NULL
);
