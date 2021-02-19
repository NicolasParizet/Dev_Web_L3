class Grille {
  ligne;
  colonne;
  separator = [];
  tableauRep = [];
  legend = [];
  ligneValide = 0;

  constructor(l, c, sep, rep, leg) {
    this.ligne = l;
    this.colonne = c;
    this.separator = sep;
    this.tableauRep = rep;
    this.legend = leg;
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
        let selected = Math.ceil(i + 1 / this.colonne);
        let line = Math.ceil(selected / this.colonne);
        let column = selected + this.colonne - this.colonne * line;
        console.log(
          "event : " + e.key + ",position = l : " + line + " c :" + column
        );

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
            //CONTROLE PAR LETTRE SUR LE TABLEAU REPLI DE LETTRES
            /*
            if (e.key === this.tableauRep[column - 1]) {
              console.log("change couleur : vrai");
              cases[i].children[0].style.backgroundColor = "green";
            } else {
              console.log("change couleur faux ");
              cases[i].children[0].style.backgroundColor = "red";
            }*/

            // CONTROLE PAR LETTRE TABLEAU REMPLI DE MOTS
            /*if (e.key === this.tableauRep[line - 1].charAt(column - 1)) {
              console.log("change couleur : vrai");
              cases[i].children[0].style.backgroundColor = "green";
            } else {
              console.log("change couleur faux ");
              cases[i].children[0].style.backgroundColor = "red";
            }*/

            //VERIFICATION HORIZONTAL PAR MOT
            //vérifier que la ligne est pleine
            let test = 0;
            this.ligneValide = 0;
            for (let n = 0; n < this.colonne; n++) {
              if (cases[n].children[0].value !== "") {
                test++;
                console.log("test :" + test);
                //La ligne est remplie => vérification du/des mot(s)
                if (test === 8) {
                  for (let j = 0; j < this.colonne; j++) {
                    if (
                      cases[j].children[0].value ===
                      this.tableauRep[line - 1].charAt(j)
                    ) {
                      //this.tableauRep[line - 1].charAt(column - 1)
                      console.log(
                        "value case : " +
                          cases[j].children[0].value +
                          " , value de tableau réponse : " +
                          this.tableauRep[line - 1].charAt(j)
                      );
                      this.ligneValide++;
                      console.log(
                        "Nb lettre ligne valide :" + this.ligneValide
                      );
                    }
                    if (this.ligneValide === 7) {
                      for (let j = 0; j < this.colonne; j++) {
                        if (cases[j].children[0].value !== null) {
                          console.log("change couleur : vrai");
                          cases[j].children[0].style.backgroundColor = "green";
                        }
                      }
                    }
                  }
                }
              }
            }

            return;
        }

        let cl = line + "x" + column;
        console.log("cl+" + cl);
        let next = document.getElementsByClassName(cl);
        if (next.length) {
          next[0].children[0].focus();
        }
      });
    }

    /* else {
                for (let j = 0; j < this.colonne; j++) {
                  console.log("change couleur faux ");
                  cases[i].children[0].style.backgroundColor = "red";
                }*/

    // prevent resizing
    document.body.style.minWidth = 50 * (this.colonne + 1) + 100 + "px";
    document.body.style.minHeight = 50 * (this.ligne + 1) + 100 + "px";
  }

  writeLegend(def) {
    document.getElementById("definition").innerHTML = def;
  }
}
