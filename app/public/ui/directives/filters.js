myApp.filter('split', function() {
    return function(input, delimiter) {
        input = (input && input.toString()) || "";
        delimiter = delimiter || ',';
        var splitArr = input.split(delimiter);
        splitArr.forEach(function(part, index, theArray) { theArray[index] = theArray[index].trim(); });
        return splitArr;
    }
});