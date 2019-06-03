// this a script is to scrape articles

// need to require cheerio & request - makes scraping possible
var request = require('request');
var cheerio = require('cheerio');

// variable to export
var scrape = function (cb) {

    //request package to request NYT: account for error, response and body (for NYT requests)
    request('http://www.nytimes.com', function(err, res, body){

        var $ = cheerio.load(body);

        //empty array of articles
        var articles = [];

        //----------Important!!----------

        // select a class and on each class, get the story heading and summary; trim cuts off white space

            // --*unsure of the 'class' to use here* (perhaps 'story')--
        $('.theme-summary').each(function(i, element){

                                        // --*unsure of the 'class' to use here* (perhaps 'balancedHeadline')--
            var head = $(this).children('.story-heading').text().trim();
                                        // --*unsure of the 'class' to use here* (perhaps 'articleBody')--
            var sum = $(this).children('.summary').text().trim();

        // 'Replace Regex Method' to clean up text with white space
        if(head && sum){
            var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, '').trim();
            var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, '').trim();

            var dataToAdd = {
                headline: headNeat,
                summary: sumNeat
            };

            articles.push(dataToAdd);
            }
        });

        // callback function to send articles 
        cb(articles);
    });
};

//export scrape to use it in the program
module.exports = scrape;