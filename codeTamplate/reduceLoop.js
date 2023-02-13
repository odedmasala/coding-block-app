const array = [1, 2, 3, 4];
// * return from the function eace number with plus 5
function mapNumbars(array) {
  //   return with reduce loop the sum of the array number

}
mapNumbars(array)

function mapNumbarsSolution(array = []) {
  let filterArray = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return filterArray;
}

reducenumber = 10;
