//load HTML before JS
$document.ready(function() {
// refer to the article-container div where dynamic content will populate
// add event listeners to any dyn. generated "save article"
// scrape new article buttons
var articleContainer = $('.article-container');
$(document).on('click', '.btn.save', handleArticleSave);
$(document).on('click', '.scrape-new', handleArticleScrape);

//when page is loaded, the initPage function will begin the logic
initPage();

function initPage() {
    //the article container needs to be emptied followed by an AJAX request for unsaved headlines
    articleContainer.empty();
    $.get('/api/headlines?saved=false')
    .then(function(data) {
        //render headlines to the page
        if (data && data.length) {
            renderArticles(data);
        }
        else {
            //otherwise display a message alerting that there are no articles
            renderEmpty();
        }
    });
}

function renderArticles(articles) {
    // this will append the HTML that has article data to the page
    // an array of JSON, containing available articles in the db, is passed
    var articlePanels = [];
    //pass each article a JSON object to the createPanel function
    //return a Bootstrap card with article data inside
    for (var i = 0; i < articles.length; i++) {
        articlePanels.push(createPanel(articles[i]));
    }
    // after the HTML for the articles is stored in the articlePanels array
    // append to the articlePanels container
    articleContainer.append(articlePanels);
}

function createPanel(article) {
    // this takes in a single JSON object for the article/headline
    // it constructs a jQuery element
    // this element is for the article panel
    var panel =
    $(["<div class='panel panel-default'>",
    "<div class='panel-heading'>",
    "<h3>",
    article.headline,
    "<a class='btn btn-success save'>",
    "Save Article",
    "</a>",
    "</h3>",
    "</div>",
    "<div class='panel-body'>",
    article.summary,
    "</div>",
    "</div>"
].join(""));
//attach the article's id to the jQuery element
// this will help determine which article the user would like to save
panel.data('_id', article._id);
// return the built panel jQuery element
return panel;
}

function renderEmpty(){
    // uses HTML to alert that there are no articles to veiw
    // joined array (HTML string) vs. using a concatenated string
}