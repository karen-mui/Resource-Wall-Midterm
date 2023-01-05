const renderResources = function(resources) {
  resources.forEach(resourceData => {
    let resource = createResourceElement(resourceData);
    $('#users-posts').prepend(resource);
  });
}

const createResourceElement = function(resource) {
  const escape = function(string) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  };
  let $resource = `
  <article class="resource">
  <form method="GET" action="/posts/${resource.id}">
    <button type="submit" class="homepage-btn">
      <figure>
      <img id="thumbnail" src=${resource.image_url}>
      ${escape(resource.title)}
        </figure>
    </button>
  </form>
</article>
  `;
  return $resource;
}

$(() => {

  const loadResources = function() {
    const userId = $('#users-posts').attr('userId');
    $.ajax({ method: "GET", url: `/api/usersMyResources/${userId}` })
      .then(function(result) {
        renderResources(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  loadResources();

});
