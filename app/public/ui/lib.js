/* Sella's generic lib(rary) for JS functions. */


randFrom = function (arr) { return arr[Math.floor(Math.random()*arr.length)]; }; //random item from array
randRange = function(min,max) { return Math.round(Math.random() * (max - min) + min); } //random int between floor and ceil

//yeah, yeah, changing prototypes' native behavior is 'dangerous'. We'll cross that bridge if we ever get to it.
Array.prototype.last = function() { return this[this.length-1]; };
Array.prototype.addArray = function(otherArr) { debugger; this.push.apply(this, otherArr); }

log = function(s){console.log(s);};

sortArrayByKeyDesc = function sortByKey(array, key) { return array.sort(function(a, b) { var x = a[key]; var y = b[key]; return ((x < y) ? 1 : ((x > y) ? -1 : 0)); }) };