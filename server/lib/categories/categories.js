var resolve = require('path').resolve,
    Category = require(resolve('./app/models/category.js'));

exports.fetch_all = function(req, callback){
    Category.find(function(err, categories) {
        //TODO - inject with localized data

        callback(categories);
    });
};


