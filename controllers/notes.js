// this is the conteroller for the notes 

var Note = require('../models/Note');
var nameDate = require('../scripts/date');

module.exports = {

    // not beginning with a scrape function; begin with a get function & then create a save function
    get: function(data, cb) {
        Note.find({
            _headlineId: data._id
        }, cb);
    },
    save: function(data, cb) {
        var newNote = {
            _headlineId: data._id,
            data: makeDate(),
            noteText: data.noteText
        };

        Note.create(newNote, function (err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    // create a delete function
    delete: function(data, cb) {
        Note.remove({
            _id: data._id
        }, cb);
    }
}