SELECT (posts.*) FROM posts
FULL OUTER JOIN likes ON post_id = posts.id
WHERE (owner_id = 2)
OR (likes.user_id = 2)
GROUP BY posts.id;
