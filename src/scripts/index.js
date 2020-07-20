(function () {

    let API_KEY = "3ad9365d4c844c31abfa4b4b1c526c52";
    let FETCH_URL = "http://newsapi.org/v2/";
    var ulArticles = document.getElementById("news-articles");

    function getAllArticles() {
        ApiCaller(`top-headlines?country=in&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(jsonResponse => {
                bindArticles(jsonResponse.articles, jsonResponse.totalResults)
            });
    }

    function getSearchArticles(event) {
        ApiCaller(`everything?q=${event.target.value}&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(jsonResponse => {
                bindArticles(jsonResponse.articles, jsonResponse.totalResults)
            });
    }

    function ApiCaller(url) {
        var req = new Request(FETCH_URL + url);
        return fetch(req);
    }

    function bindArticles(articles, totalResults) {
        let output = ``;

        if (totalResults > 0) {
            articles.forEach(article => {
                output += ` <section class="container">
                                <li class="article">
                                    <a class="article-link" href="${article.url}" target="_blank">
                                        <div class="img-area">
                                            <img src="${article.urlToImage}" class="article-img" alt="${article.title}"></img>
                                        </div>
                                        <h2 class="article-title">${article.title}</h2>
                                        <p class="article-description">${article.description || "Description not available"}</p> <br>
                                        <span class="article-author">-${article.author ? article.author : "Anon"}</span><br>
                                    </a>
                                </li>
                            </section>
                        `;
            });
            ulArticles.innerHTML = output;
        } else {
            ulArticles.innerHTML = `<h3 class="not-found">No article was found based on the search.</li>`;
        }
    }

    ulArticles.innerHTML = '<p class="load">News are Loading...</p>';
    //binding event to the search input
    document.getElementById("search").addEventListener('change', getSearchArticles);

    //getting all the articles
    getAllArticles();

})();
