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
    },
    // wrote a delete property 
    delete: function(query, cb) {
        Headline.remove(query, cb);
    },
    //wrote a way to get the items out of the collection, sort from newest to oldest, then pass the docs to a cb function
    get: function(query, cb) {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc){
            cb(doc);
        });
    },
    //function to update the scraped articles with a relevant id & info
    update: function(query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}