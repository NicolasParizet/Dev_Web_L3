class Grille {
  nbLigne;
  nbColonne;
  separator = [];
  tableauRep = [];
  legend = [];
  nbCaseValide = 0;

  constructor(l, c, sep, rep, leg) {
    this.nbLigne = l;
    this.nbColonne = c;
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
    for (let i = 0; i <= this.nbLigne; i++) {
      // loop column by column
      for (let j = 0; j <= this.nbColonne; j++) {
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
        let selected = Math.ceil(i + 1 / this.nbColonne);
        let line = Math.ceil(selected / this.nbColonne);
        let column = selected + this.nbColonne - this.nbColonne * line;
        console.log("event : " + e.key + ",position = l : " + line + " c :" + column);

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
            //CONTROLE PAR LETTRE AVEC TABLEAU REMPLI DE LETTRES
            /*
            if (e.key === this.tableauRep[column - 1]) {
              console.log("change couleur : vrai");
              cases[i].children[0].style.backgroundColor = "green";
            } else {
              console.log("change couleur faux ");
              cases[i].children[0].style.backgroundColor = "red";
            }*/

            // CONTROLE PAR LETTRE AVEC TABLEAU REMPLI DE MOTS
            /*
            if (e.key === this.tableauRep[line - 1].charAt(column - 1)) {
              console.log("change couleur : vrai");
              cases[i].children[0].style.backgroundColor = "green";
            } else {
              console.log("change couleur faux ");
              cases[i].children[0].style.backgroundColor = "red";
            }
            */

            //VERIFICATION HORIZONTALE PAR MOT
            //vérifier que la ligne est pleine
            let nbCaseRempliesHorizontale = 0;
            this.nbCaseValide = 0;
            for (let n = 0; n < this.nbColonne; n++) {
              //console.log("ligne " + (line - 1) + " colonne : " + n);
              //console.log("case " + (((line - 1) * this.nbColonne) + n));
              if (cases[(((line - 1) * this.nbColonne) + n)].children[0].value !== "") {
                nbCaseRempliesHorizontale++;
                console.log("Nb cases remplies :" + nbCaseRempliesHorizontale);
                //La ligne est remplie => vérification du/des mot(s)
                if (nbCaseRempliesHorizontale === this.nbColonne) {
                  for (let j = 0; j < this.nbColonne; j++) {
                    if (cases[(((line - 1) * this.nbColonne) + j)].children[0].value === this.tableauRep[line - 1].charAt(j)) {
                      //console.log("value case : " + cases[(((line - 1) * this.nbColonne) + j)].children[0].value + " , value de tableau réponse : " + this.tableauRep[line - 1].charAt(j));
                      this.nbCaseValide++;
                      //console.log("Nb lettre ligne valide :" + this.nbCaseValide);
                    }
                    if (this.nbCaseValide === this.nbColonne-1) {
                      for (let j = 0; j < this.nbColonne; j++) {  
                        //if (cases[(((line - 1) * this.nbColonne) + j)].children[0].value !== null) { //verif case separateur => a faire
                          //console.log("change couleur : vrai");
                          cases[(((line - 1) * this.nbColonne) + j)].children[0].style.backgroundColor = "green";
                        //}
                      }
                      this.finDePartie(cases);
                    }
                  }
                }
              }
            }


            //VERIFICATION VERTICAL PAR MOT 
            //vérifier que la colonne est pleine
            let nbCaseRempliesV = 0;
            this.nbCaseValide = 0;
            for (let n = 0; n < this.nbLigne; n++) {
              console.log("ligne " + n + " colonne : " + (column-1));
              console.log("case " + ((n*(this.nbLigne-1)) + (column-1)));
              if (cases[(n*(this.nbLigne-1)) + (column-1)].children[0].value !== "") {
                nbCaseRempliesV++;
                console.log("Nb cases Verticales remplies :" + nbCaseRempliesV);
                //La colonne est remplie => vérification du/des mot(s)
                if (nbCaseRempliesV === this.nbLigne) {
                  for (let j = 0; j < this.nbLigne; j++) {
                    if (cases[(j*(this.nbLigne-1)) + (column-1)].children[0].value === this.tableauRep[j].charAt(column-1)) {
                      console.log("value case : " + cases[(j*(this.nbLigne-1)) + (column-1)].children[0].value + " , value de tableau réponse : " + this.tableauRep[line - 1].charAt(j));
                      this.nbCaseValide++;
                      console.log("Nb lettre ligne valide :" + this.nbCaseValide);
                    }
                    if (this.nbCaseValide === this.nbLigne-1) {
                      for (let j = 0; j < this.nbLigne; j++) {
                        if (cases[(j*(this.nbLigne-1)) + (column-1)].children[0].value !== null) {   //verif case separateur => a faire
                          console.log("change couleur : vrai");
                          cases[(j*(this.nbLigne-1)) + (column-1)].children[0].style.backgroundColor = "green";
                        }
                      }
                      this.finDePartie(cases);
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
                for (let j = 0; j < this.nbColonne; j++) {
                  console.log("change couleur faux ");
                  cases[i].children[0].style.backgroundColor = "red";
                }*/

    // prevent resizing
    document.body.style.minWidth = 50 * (this.nbColonne + 1) + 100 + "px";
    document.body.style.minHeight = 50 * (this.nbLigne + 1) + 100 + "px";
  }

  writeLegend(def) {
    document.getElementById("definition").innerHTML = def;
  }

  finDePartie(cases){
    let nbCasesValide = 0;
    let nbCases = this.nbColonne*this.nbLigne;
    for(let i = 0; i<nbCases;i++){
      if (cases[i].children[0].style.backgroundColor === "green"){
        nbCasesValide++;
      }
    }
    if(nbCasesValide === nbCases){
      console.log("FIN DE PARTIE");
    }
  }


}
