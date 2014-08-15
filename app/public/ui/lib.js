/* Sella's generic lib(rary) for JS functions. */


randFrom = function (arr) { return arr[Math.floor(Math.random()*arr.length)]; }; //random item from array
randRange = function(min,max) { return Math.round(Math.random() * (max - min) + min); } //random int between floor and ceil

//yeah, yeah, changing prototypes' native behavior is 'dangerous'. We'll cross that bridge if we ever get to it.
Array.prototype.last = function() { return this[this.length-1]; };
Array.prototype.addArray = function(otherArr) { this.push.apply(this, otherArr); }

log = function(){_.each(arguments,function(arg) { console.log(arg) } )};
// normalDate("Fri Aug 15 2014 18:26:48 GMT+0300 (IDT)") --> 22/8 14:55
normalDate = function(dateString) { var d = new Date(dateString); return d.getDate()+"/"+(parseInt(d.getMonth())+1)+" "+d.getHours()+":"+d.getMinutes() }

sortArrayByKeyDesc = function sortByKey(array, key) { return array.sort(function(a, b) { var x = a[key]; var y = b[key]; return ((x < y) ? 1 : ((x > y) ? -1 : 0)); }) };