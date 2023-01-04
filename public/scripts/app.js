// Client facing scripts here

$(document).ready(function() {

  // turns comment obj into HTML formatted tweet articles
  const createComment = function(comment) {
    let $comment = $(`
    <article>
    <header>
      <span><img src=${comment.user.avatars}></i>${comment.user.name}</span>
      <span id="handle">${comment.user.handle}</span>
    </header>
    <div>${comment.content.text}</div>
    <footer>
      <span>${timeago.format(comment.created_at)}</span>
      <span><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i
          class="fa-solid fa-heart"></i></span>
    </footer>
    </article>
    `);

    return $comment;
  };

  // inserts HTMl of tweets into the comment-container section of the DOM
  const renderComments = function(comments) {
    for (let comment of comments) {
      $('#comment-container').append(createComment(comment));
    }
  };

  // AJAX implementation for sending (POST) comment to server
  $("form").submit(function(event) {
    const obj = {content: event.target.commentbox.value, post_id: window.location.pathname.split('/')[2]}
    console.log('form');
    event.preventDefault();
      $.ajax({
        method: "POST",
        url: `/posts/post/${window.location.pathname.split('/')[2]}/comment`,
        data: obj
      })
        .then(() => console.log('complete'))
        .then($("body").load(`/post/`)); // HERE

  });

  // AJAX implementation for retrieving (GET) data from the server
  const loadComments = function() {
    $.ajax({
      method: "GET",
      url: "/comments",
    })
      .then(function(comments) {
        renderComments(comments);
      });
  };

  // loadComments();


});
