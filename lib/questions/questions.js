//includes

//constants


exports.list_top_rates = function(request_params) {
    return {
        1: "first question",
        2: "second question",
        3: "third question",
        4: "forth question"
    }
};


exports.fetch_question = function(request_params) {
    return {
        1: "first question"
    }
};


exports.fetch_question_by_category = function(category) {
    return {
        1: "first question in category " + category,
        2: "second question in category " + category,
        3: "third question in category " + category,
        4: "forth question in category " + category
    }
};

exports.new_question = function(request_params) {

    return{result: "I have just created a new question (Yeah, right).", error: undefined}
};
