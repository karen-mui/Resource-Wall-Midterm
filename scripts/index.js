
const renderResources = function(resources) {
  resources.forEach(resourceData => {
    let resource = createResourceElement(resourceData);
    $('#homepage-posts').prepend(resource);
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
          <header>
            <h1>${escape(resource.title)}</h1>
          </header>
          <img id="thumbnail" src=${resource.image_url}>
        </button>
      </form>
    </article>
  `;
  return $resource;
}

$(() => {
  const loadResources = function() {
    $.ajax({ method: "GET", url: '/api/allPosts' })
      .then(function(result) {
        console.log(result);
        renderResources(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  loadResources();

});
