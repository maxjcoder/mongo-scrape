// scrape and makeDate scripts
var scrape = require('../scripts/scrape');
var makeDate = require ('../scripts/date');

// Headline and Note mongoose models
var Headline = require('../models/Headline');

module.exports = {

    // use fetch to run a function, pass cb into that function, then run scrape
    fetch: function(cb) {
        scrape(function(data){
            
            // set data to be articles, go thru ea. article and run makeDate function and saved to false
            var articles = data;
            for (var i=0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }

            // run a Mongo function  - take headline and insert into a collection, unordered
            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
                cb(err, docs);
            });
        });
    }
}