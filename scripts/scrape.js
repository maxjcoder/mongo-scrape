// this script is to scrape articles


// need to require cheerio & request - makes scraping possible
var request = require('request');
var cheerio = require('cheerio');

var scrape = function (cb) {

    request('http://www.nytimes.com', function(err, res, body){

        var $ = cheerio.load(body);

        var articles = [];

        $('').each(function(i, element){
            var head = $(this).children('').text().trim();
            var sum = $(this).children('').text().trim();

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
        cb(articles);
    });
};

module.exports = scrape;