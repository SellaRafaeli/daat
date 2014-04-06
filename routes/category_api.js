var resolve = require('path').resolve,
    categories = require(resolve('./lib/categories/categories.js'));

exports.all = function(req, res){
    categories.fetch_all(req, function(final_result) {
        res.json(final_result);
    });
};