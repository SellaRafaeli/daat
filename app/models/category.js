//convention example - category 1 -> sub_categories -> 101-199 -> sub_sub_categories -> 1001 -> 1999

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var threadSchema = new Schema({
    id                  : Number,
    status              : String,
    parent_category     : Number,
    child_categories    : Array
});

module.exports = mongoose.model('Category', threadSchema);