var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var threadSchema = new Schema({
    id                  : Number,
    status              : String,
    parent_category     : Number,
    child_categories    : Array
});

module.exports = mongoose.model('Category', threadSchema);