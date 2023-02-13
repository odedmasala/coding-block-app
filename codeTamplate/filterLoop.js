const numArray = [5, 7, 14, 10, 11, 9, 20];
// Returns from the function, an array filtered from the given array with numbers greater than 8
function filterNumbers(array) {
//   Write your code here
}
filterNumbers(numArray)





function filterNumbersSolution(array = []) {
  let filterArray = array.filter((elem) => {
    return elem > 8;
  });
  return filterArray;
}

array = [14, 10, 11, 9, 20]
