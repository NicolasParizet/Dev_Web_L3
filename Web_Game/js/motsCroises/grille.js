class Grille {
  ligne;
  colonne;
  separator = [];

  constructor(l, c, sep) {
    this.ligne = l;
    this.colonne = c;
    this.separator = sep;
  }

  /**
         Autobuild the grid client-side
        **/
  makeGrille() {
    // add the first empty legend item
    document.getElementById("grid").innerHTML =
      '<div class="legendPlaceholder"</div>';

    // loop line by line
    for (let i = 0; i <= this.ligne; i++) {
      // loop column by column
      for (let j = 0; j <= this.colonne; j++) {
        // line legend
        if (j === 0) {
          if (i) {
            document.getElementById(
              "grid"
            ).innerHTML += `<div class="legendV">${i}</div>`;
          }
          continue;
        }

        // column legend
        if (i === 0) {
          document.getElementById(
            "grid"
          ).innerHTML += `<div class="legendH">${convertToRoman(j)}</div>`;
          continue;
        }

        // case HxV
        let cl = i + "x" + j;

        // separator or case to fill
        if (this.separator.indexOf(cl) !== -1) {
          document.getElementById(
            "grid"
          ).innerHTML += `<div class="case ${cl}"><div class="full"></div></div>`;
        } else {
          document.getElementById(
            "grid"
          ).innerHTML += `<div class="case ${cl}"><input class="empty" type="text" maxlength="1"/></div>`;
        }
      }

      // line breaks
      if (i === 0) {
        document.getElementById("grid").innerHTML += '<br class="leg"/>';
        continue;
      }
      document.getElementById("grid").innerHTML += "<br/>";
    }

    // events on keypress to replace content of the case or navigate with keyboard arrows
    let cases = document.getElementsByClassName("case");
    for (let i = 0; i < cases.length; i++) {
      cases[i].addEventListener("keypress", (e) => {
        console.log("event : "+ e.key);
        let selected = Math.ceil(i + 1 / this.colonne);
        let line = Math.ceil(selected / this.colonne);
        let column = selected + this.colonne - this.colonne * line;

        switch (e.key) {
          case "ArrowUp":
            line--;
            break;
          case "ArrowDown":
            line++;
            break;
          case "ArrowLeft":
            column--;
            break;
          case "ArrowRight":
            column++;
            break;
          default:
            if (
              e.key.match(/[a-z]|é|è|ç|à|â|ê|î|ô|û|ä|ë|ï|ö|ü/i) &&
              e.charCode
            ) {
              cases[i].children[0].value = e.key;
            }
            return;
        }

        let cl = line + "x" + column;
        console.log("cl+"+cl);
        let next = document.getElementsByClassName(cl);
        if (next.length) {
          next[0].children[0].focus();
        }
      });
    }

    // prevent resizing
    document.body.style.minWidth = 50 * (this.colonne + 1) + 100 + "px";
    document.body.style.minHeight = 50 * (this.ligne + 1) + 100 + "px";
  }

  writeLegend(def){
    document.getElementById("definition").innerHTML = def; 
  }
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
