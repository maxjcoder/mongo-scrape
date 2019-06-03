//require mongoose npm
var mongoose = require('mongoose');

//create a Schema using the mongoose Schema function: require a headline and a summary
var Schema = mongoose.Schema;

var headlineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }

});

var Headline = mongoose.model('Headline', headlineSchema);

//export headline Schema
module.exports = Headline;