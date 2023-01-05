const setRating = function(postId, rating) {
  $.post(`/posts/${postId}/rate`, { rating })
    .then(function() {
      $('.stars-section i').removeClass('fa-solid');
      $('.stars-section i').addClass('fa-regular');
      $('.stars-section i').slice(0, rating).addClass('fa-solid');
      $('.stars-section i').slice(0, rating).removeClass('fa-regular');
    })
};

const likePost = function(postId) {
  $.post(`/posts/${postId}/like`)
    .then(function() {
      if ($('#like-btn i').hasClass('fa-regular')) {
        $('#like-btn i').removeClass('fa-regular');
        $('#like-btn i').addClass('fa-solid');
      } else {
        $('#like-btn i').removeClass('fa-solid');
        $('#like-btn i').addClass('fa-regular');
      }
    })
};

