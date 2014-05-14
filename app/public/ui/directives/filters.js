myApp.filter('split', function() {
    return function(input, delimiter) {
        input = (input && input.toString()) || "";
        delimiter = delimiter || ',';
        var splitArr = input.split(delimiter);
        splitArr.forEach(function(part, index, theArray) { theArray[index] = theArray[index].trim(); });
        return splitArr;
    }
});

myApp.filter('relativeTime', function() { return function(date) {
    //if more than two days ago, return moment's calendar ("yesterday at 19:18 pm"). Else, return simple date: 14/5.
    return Math.abs(moment(date).diff(moment(),'d')) < 2 ? moment(date).calendar() : moment(date).format('D/M');
} });