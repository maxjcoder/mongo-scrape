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
               res.json ({
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
    // grab headlines in the db
    router.get('/api/headlines', function(req, cb){
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlinesController.get(query, function(data){
            res.json(data);
        });
    });

    //route for deleting a specific article
    router.delete('/api/headlines/:id', function(){
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(){
            res.json(data);
        });
    });

    // route to update headlines as needed
    router.patch('/api/headlines', function(req, res){
        headlinesController.update(req.body, function(err, data){
            res.json(data);
        });
    });

    // route to grab notes assoc. with article for user
    router.get('api/notes/:headline_id', function(req, res){
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }

        notesController.get(query, function(err, data){
            res.json(data);
        });
    });

    //route to delete notes 
    router.delete('/api/notes/:id', function(req, res){
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data){
            res.json(data);
        });
    });

    //route to post new notes to articles
    router.post('api/notes', function(req, res){
        notesController.save(req.body, function(data){
            res.json(data);
        });
    });
}