 
// // Call arrayFilterer1 (with a callback function) to filter out all the numbers 
// // not equal to 2. 
// arrayFilterer1(function (elem) { 
//   return elem !== 2; // check if element is not equal to 2 
// }, function (currentArray) { 
//     // 'this' within the callback function should refer to originalArray which is [1, 2, 3] 
//       console.log(this); // prints [1, 2, 3] 
//       console.log(currentArray); // prints [1, 3] 
//     }); 
     
// // Call arrayFilterer1 (without a callback function) to filter out all the 
// // elements not equal to 3. 
// arrayFilterer1(function (elem) { 
//     return elem !== 3; // check if element is not equal to 3 
// }); 
    