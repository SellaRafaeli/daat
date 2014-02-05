
//id
//title             VARCHAR(250)
//text              TEXT
//category_id       INT(11)
//sub_category_id   INT(11)
//rating(1-1000)    INT(11) ? should be more ?


//TODO - create a fan in system for show_in_homepage +  push up (don't create in this model)
//TODO - create a picture + video upload model (don't create in this model)
//TODO - create an index on rating. maybe on sub_category
//TODO - create a cache warmer for top rating in each category / sub category

//includes
var START_RATING = 400;

exports.list_top_rates = function(req, res) {
    var limit  = req.limit || 20;
//    result = question.find({id: 1}).toJson;
    var result = req.db.query('select * from questions order by rating desc limit ? ', limit, function(err, result) {
        handle_query(err, result);
        return result;
    });

    retult = req.models.question.find();

    return result;
//    {
//        1: "first question , limit is " + limit,
//        2: "second question",
//        3: "third question",
//        4: "forth question"
//    }
};


exports.fetch_question = function(id) {
    var result = mysql_connection.query('select * from questions where id = ? limit 1 ', id, function(err, result) {
        handle_query(err, result);
    });
    return result;
//    {
//        1: "first question"
//    }
};


exports.fetch_question_by_category = function(request_params, category_id, sub_category_id) {
    sub_category_id = sub_category_id || null;
    var limit       = request_params.limit || 20;
    var sql         = "select * from questions where category_id = ? ";
    if (sub_category_id != null)
        sql         += "and sub_category_id = " + sub_category_id + " ";
    end
    sql             += "limit ?";
    var result = mysql_connection.query(sql, category_id, limit, function(err, result) {
        handle_query(err, result);
    });
    return result;
//    {
//        1: "first question in category " + category + " limit is " + limit,
//        2: "second question in category " + category,
//        3: "third question in category " + category,
//        4: "forth question in category " + category
//    }
};

exports.new_question = function(request_params) {
    //TODO - validation before save
    //validate_params(request_params);
    var title     = request_params.title;
    var text      = request_params.text;
    var rating    = START_RATING;

    sql = "insert into "
    var result = mysql_connection.query(sql, category_id, limit, function(err, result) {
        handle_query(err, result);
    });
    return{result: "I have just created a new question (Yeah, right).", error: undefined}
};

handle_query = function(err, result) {
    if (err == undefined){
        result;
    }else{
        console.log('Error in querying ' + err);
    }
};
