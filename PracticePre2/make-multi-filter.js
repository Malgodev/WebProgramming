function MakeMultiFilter(originalArray){

    let currentArray = (originalArray);

    function arrayFilterer(filterCriteria, callback){
        if (typeof filterCriteria !== "function"){
            return currentArray;
        }

        currentArray = currentArray.filter(filterCriteria);

        if (typeof callback === "function"){
            callback.call(originalArray, currentArray);
        }
        return arrayFilterer;
    };

    return arrayFilterer;
}

let arrayFilterer1 = MakeMultiFilter([1, 2, 3]); 

arrayFilterer1(function (elem) { 
    return elem !== 2; // check if element is not equal to 2 
  }, function (currentArray) { 
    console.log(this); // prints [1, 2, 3] 
    console.log(currentArray); // prints [1, 3] 
  });

arrayFilterer1(function (elem) { 
    return elem !== 3; // check if element is not equal to 3 
}); 

var currentArray = arrayFilterer1();
console.log("currentArray", currentArray);

function filterTwos(elem) { return elem !== 2; } 
function filterThrees(elem) { return elem !== 3; } 
var arrayFilterer2 = MakeMultiFilter([1, 2, 3]); 
var currentArray2 = arrayFilterer2(filterTwos)(filterThrees)(); 
console.log("currentArray2", currentArray2); 

var arrayFilterer3 = MakeMultiFilter([1, 2, 3]); 
var arrayFilterer4 = MakeMultiFilter([4, 5, 6]); 
console.log(arrayFilterer3(filterTwos)()); // prints [1, 3] 
console.log(arrayFilterer4(filterThrees)()); // prints [4, 5, 6]

