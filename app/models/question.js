var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var threadSchema = new Schema({
    id              : Number,
    status          : String,
    locale          : String,
    title           : String,
    text            : String,
    category_id     : Number,
    sub_category_id : Number,
    rating          : Number,
    answers         : Array,
    tags            : Array
});

module.exports = mongoose.model('Question', threadSchema);