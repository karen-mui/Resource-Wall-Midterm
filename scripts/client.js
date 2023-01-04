const createPostElement = function(post) {
  let element = `
    <article class="post">
      <h1>${(post.title)}</h1>
      <img src="${(post.image_url)}">
      <p>${(post.description)}</p>
      <a href="${(post.content_url)}">Go To Content</a>
      <p>${(post.date_posted)}</p>
    </article>
  `;
  return element;
};

// const renderPosts = function(posts) {
//   posts.forEach(data => {
//     let post = createPostElement(data);
//     return post;
//   });
// };

module.exports = { createPostElement };
