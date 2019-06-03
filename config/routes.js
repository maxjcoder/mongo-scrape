//server routes

// call up scrape function from scripts directory
var scrape = require('../scripts/scrape');

// call up headlines and notes from the controller folder
var headlinesController = require('../controllers/headlines');
var notesController = require('../controllers/notes');

module.exports = function(router) {
    router.get("/", function(req, res) {
        res.render("home");
    });
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    // fetch route for an API route to get articles
    router.get('/api/fetch', function(req, res){
        headlinesController.fetch(function(err, docs){
            if (!docs || docs.insertedCount === 0) {
               res.jason ({
                   message: "There are no new articles today. Please check again tomorrow!"
               }); 
            }
            else {
                res.json ({
                    message: "Added " + docs.insertedCount + " new articles for you!"
                });
            }
        });
    });

    
}