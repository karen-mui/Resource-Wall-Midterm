const renderResources = function(resources) {
  resources.forEach(resourceData => {
    let resource = createResourceElement(resourceData);
    $('#search-result-posts').prepend(resource);
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
    let topic = $('#search-bar').attr('searchTopic');
    $.ajax({ method: "GET", url: '/api/allPosts' })
      .then(function(results) {
        const searchResults = [];
        results.forEach(result => {
          if (result.topic === topic) {
            searchResults.push(result);
          }
        })
        renderResources(searchResults);
      })
      .catch(err => {
        console.log(err);
      });
  };

  loadResources();

});
