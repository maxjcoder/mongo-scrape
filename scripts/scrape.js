// this a script is to scrape articles
//=====================================

// need to require cheerio & axios - makes scraping possible
var axios = require('axios');
var cheerio = require('cheerio');

// variable to export
var scrape = function () {

    //request package to request NYT: account for error, response and body (for NYT requests)
    return axios.get('http://www.nytimes.com').then(function(res){

        var $ = cheerio.load(res.data);

        //empty array of articles
        var articles = [];

        //----------Important!!----------

        // select a class and on each class, get the story heading and summary; trim cuts off white space

            // --*unsure of the 'class' to use here* (perhaps 'theme-summary')--
        $('.theme-summary').each(function(i, element){

                                        // --*unsure of the 'class' to use here* (perhaps 'story-heading')--
            var head = $(this)
            .children('.story-heading')
            .text()
            .trim();
                                        // --*unsure of the 'class' to use here* (perhaps 'story-heading')--
            var url = $(this)
            .children('.story-heading')
            .children('a')
            .attr('href');
                                        // --*unsure of the 'class' to use here* (perhaps 'story-heading')--
            var sum = $(this)
            .children('.story-heading')
            .text()
            .trim();

        // 'Replace (Regex Method)' to clean up text with white space
        if(head && sum){
            var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            var dataToAdd = {
                headline: headNeat,
                summary: sumNeat,
                url: url
            };

            articles.push(dataToAdd);
            }
        });
        return articles;
    });
};

//export scrape to use it in the program
module.exports = scrape;