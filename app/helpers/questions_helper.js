

exports.build_category_query = function(req){
    var category_id     = req.params.category_id;
    var sub_category_id = req.query['sub_category_id'] || null;

    var query           = {category_id: category_id};
    //TODO - append sub_category_id if needed
//    if (sub_category_id != null) {
//        $.extend(query, {sub_category_id: sub_category_id});
//    };
//    console.log(query);
    return query;
};


exports.is_full = function(item){
    if(typeof(item) == "undefined"){ return false}
    return true;
};

