/** En JavaScript on ne peut pas déclarer directement de tableau à n dimensions
   en précisant toutes les dimensions. tab [4][4] n'est pas possible par exemple.
   On déclare en général un tableau à une dimension de taille varialbe (ci-dessous 
   let arr = []) puis ensuite pour chacune des lignes du tableau, on lui affecte un autre
   tableau (arr[i] = [] ci-dessous) */

function create2DArray(rows) {
  let arr = [];

  for (let i = 0; i < rows; i++) {
    arr[i] = [];
  }

  return arr;
}

const romanMatrix = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"]
];
const convertToRoman = (num) => {
  if (num === 0) {
    return "";
  }
  for (let i = 0; i < romanMatrix.length; i++) {
    if (num >= romanMatrix[i][0]) {
      return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
    }
  }
};
const reset = () => {
  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
};
