const renderComments = function(comments) {
  comments.forEach(commentData => {
    let comment = createCommentElement(commentData);
    $('#comment-section').prepend(comment);
  });
}

const createCommentElement = function(comment) {
  const escape = function(string) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  };
  let $comment = `
    <article class="commet">
      <p>${comment.commenter_name}:${comment.content}</p>
      <footer>${timeago.format(comment.date_posted)}</footer>
    </article>
  `;
  return $comment
}

$(() => {

  const loadComments = function() {
    const postId = $('#comment-section').attr('postId');
    $.ajax({ method: "GET", url: `/api/post/${postId}/comments` })
      .then(function(result) {
        renderComments(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  loadComments();

});
