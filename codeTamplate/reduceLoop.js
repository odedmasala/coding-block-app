const array = [1, 2, 3, 4];
// Return from the function the full amount of the entire array given with reduce method
function mapNumbers(array) {
//   Write your code here
}
mapNumbers(array)





  function mapNumbersSolution(array = []) {
    let filterArray = array.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return filterArray;
  }
  mapNumbersSolution(array)

reducenumber = 10;
