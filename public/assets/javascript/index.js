$(document).ready(function() {

  var articleContainer = $('.article-container');
  $(document).on('click', '.btn.save', handleArticleSave);
  $(document).on('click', '.scrape-new', handleArticleScrape);
  $(".clear").on("click", handleArticleClear);

  initPage();

  function initPage() {

      $.get('api/headlines?saved=false')
          .then(function(data) {
            articleContainer.empty();
              if (data && data.length) {
              } else {
              renderEmpty();
              }
          });

  }

  function renderArticles(articles) {

      var articlePanels = [];

      for (var i = 0; i < articles.length; i ++) {
          articlePanels.push(createPanel(articles[i]));
      }

      articleContainer.append(articlePanels);
  }

  function createPanel(article) {

      var panel =
      $(["<div class='card'>",
      "<div class='card-heading'>",
      "<h3>",
      article.headline,
      "<a class='btn btn-success save'>",
      "Save Article",
      "</a>",
      "</h3>",
      "</div>",
      "<div class='card-body'>",
      article.summary,
      "</div>",
      "</div>"
      ].join(""));
  
      panel.data("_id", article._id);

      return panel;
  }

  function renderEmpty() {

      var emptyAlert =
      $(["<div class='alert alert-warning text-center'>",
      "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
      "</div>",
      "<div class='card'>",
      "<div class='card-heading text-center'>",
      "<h3>What Would You Like To Do?</h3>",
      "</div>",
      "<div class='card-body text-center'>",
      "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
      "<h4><a href='/saved'>Go To Saved Articles</a></h4>",
      "</div>",
      "</div>"
      ].join(""));

      articleContainer.append(emptyAlert);
  }

  function handleArticleSave() {

      var articleToSave = $(this).parents(".panel").data();
      articleToSave.saved = true;

          $.ajax({
          method: "PATCH",
          url: "/api/headlines",
          data: articleToSave
          })
          if (data.ok) {
          
           initPage();
          }
      
  }

  function handleArticleScrape () {
      $.get("/api/fetch")
          .then(function(data) { 
            initPage();
            bootbox.alert("<h3 class'text-cenetr m-top-80'>" + data.message + "<h3>");
        });
    }

  function handleArticleClear() {
    $.get("api/clear").then(function() {
      articleContainer.empty();
      initPage();
    });
  }
  
});