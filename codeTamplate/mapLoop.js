const numArray = [0, 5, 20, 10, 45]
// * Return from the function, an array in which each element has been added to it 5 with map method.
function mapNumbers(array) {
//   Write your code here
}
mapNumbers(numArray)




function mapNumbersSolution(array = []) {
  let filterArray = array.map((elem) => {
    return elem + 5;
  });
  return filterArray;
}

array = [5, 10, 25, 15, 50]
