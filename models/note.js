//require mongoose npm
var mongoose = require('mongoose');

//create a Schema using the mongoose Schema function: require a headline and a summary
var Schema = mongoose.Schema;

// new 'noteSchema' with an id for headline to attach note to 
var noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: 'Headline'
    },
    // similar date string and a string for the user's note
    date: String,
    noteText: String

});

//create note model and export for use within the entire program
var Note = mongoose.model('Note', noteSchema);

//export headline Schema
module.exports = Note;


//Next:
// 1. write scripts needed for date
// 2. write scripts needed to 'scrape' articles using cheerio