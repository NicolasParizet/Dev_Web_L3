

/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
class Grille {

  nbColonne;
  nbLigne;
  tabCookies = [];
  cookieASwap = [];



  constructor(l, c) {
    this.nbColonne = c;
    this.nbLigne = l;
    this.remplirTableauDeCookies(6);
  }


  /**
   * parcours la liste des divs de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies() {
    let caseDivs = document.querySelectorAll("#grille div");

    let btnDetectMatch = document.getElementById("btnDetectMatch");

    let btnDetectMatchDisparait = document.getElementById("btnDetectMatchDisparait");


    caseDivs.forEach((div, index) => {
      let ligne = Math.floor(index / this.nbColonne);
      let colonne = index % this.nbColonne;

      //console.log("On remplit le div index=" + index + " l=" + ligne + " col=" + colonne);

      let img = this.tabCookies[ligne][colonne].htmlImage;

      btnDetectMatch.onclick = (evt) =>{
        console.log("Match");
        this.detecterMatch();
      }

      btnDetectMatchDisparait.onclick = (evt) =>{
        console.log("Match disparait");
        this.detecterMatchDisparait();
      }


      //event ONCLICK
      img.onclick = (evt) => {

        let imgClique = evt.target;
        console.log("Cookie click ligne " + imgClique.dataset.ligne + ", colonne " + imgClique.dataset.colonne);
        const ligneCookie = imgClique.dataset.ligne;
        const colonneCookie = imgClique.dataset.colonne;
        let cookieSelect = this.tabCookies[ligneCookie][colonneCookie];

        if (this.cookieASwap.length === 0) {  //click sur cookie de départ

          this.cookieASwap.push(cookieSelect); //this.cookieClick[0] = this.tabCookies[ligneCookie][colonneCookie];
          cookieSelect.selectionnee();
        }
        else {   //2e cookie select  ==> swap
          this.cookieASwap.push(cookieSelect);
          cookieSelect.selectionnee();
          if (this.distanceCookiesValide()) {
            console.log("swap OK");
            this.swapCookies();

          }
          else {
            console.log("swap invalide ");
          }
          this.cookieASwap[0].deselectionnee();
          this.cookieASwap[1].deselectionnee();
          this.cookieASwap = [];
        }
      }


      //EVENT DRAG & DROP
      img.addEventListener("dragstart", (evt) => {
        console.log("drag start");
        let imgClique = evt.target;
        const ligneCookie = imgClique.dataset.ligne;
        const colonneCookie = imgClique.dataset.colonne;
        let cookieSelect = this.tabCookies[ligneCookie][colonneCookie];

        if (this.cookieASwap.length === 0) {  //click sur cookie de départ

          this.cookieASwap.push(cookieSelect); //this.cookieClick[0] = this.tabCookies[ligneCookie][colonneCookie];
          cookieSelect.selectionnee();
        }

      });

      //Permet d'activer le drop
      img.ondragover = (evt) => {
        return false;
      };

      img.addEventListener("drop", (evt) => {
        let imgClique = evt.target;
        const ligneCookie = imgClique.dataset.ligne;
        const colonneCookie = imgClique.dataset.colonne;
        let cookieSelect = this.tabCookies[ligneCookie][colonneCookie];

        if (cookieSelect.ligne !== this.cookieASwap[0].ligne || cookieSelect.colonne !== this.cookieASwap[0].colonne) {

          if (this.cookieASwap.length === 1) {  //click sur cookie de départ

            this.cookieASwap.push(cookieSelect); //this.cookieClick[0] = this.tabCookies[ligneCookie][colonneCookie];
            cookieSelect.selectionnee();
            console.log("Cookie N1 ligne " + this.cookieASwap[0].ligne + ", colonne " + this.cookieASwap[0].colonne);
            console.log("Cookie N2 ligne " + this.cookieASwap[1].ligne + ", colonne " + this.cookieASwap[1].colonne);

          }
        }

        console.log("drop ");
        if (this.distanceCookiesValide()) {
          console.log("swap OK");
          this.swapCookies();

        }
        else {
          console.log("swap invalide ");
        }
        this.cookieASwap[0].deselectionnee();
        this.cookieASwap[1].deselectionnee();
        this.cookieASwap = []

        this.detecterMatch();
      });

      // on affiche l'image dans le div pour la faire apparaitre à l'écran.
      div.appendChild(img);

    });
  }

  distanceCookiesValide() {
    return ((Math.abs(this.cookieASwap[0].ligne - this.cookieASwap[1].ligne) == 1) //vérification horizontal
      && (Math.abs(this.cookieASwap[0].colonne - this.cookieASwap[1].colonne) == 0))
      ||
      ((Math.abs(this.cookieASwap[0].ligne - this.cookieASwap[1].ligne) == 0)  //vérification verticale
        && (Math.abs(this.cookieASwap[0].colonne - this.cookieASwap[1].colonne) == 1))

  }


  swapCookies() {

    //récupération type et src variable tmp
    let tmpsrc = this.cookieASwap[0].htmlImage.src;
    let tmptype = this.cookieASwap[0].type;

    //réaafecte cookie 1
    this.cookieASwap[0].htmlImage.src = this.cookieASwap[1].htmlImage.src;
    this.cookieASwap[0].type = this.cookieASwap[1].type;

    //réaffecte cookie 2
    this.cookieASwap[1].htmlImage.src = tmpsrc;
    this.cookieASwap[1].type = tmptype;

  }

  detecterMatch() {
    this.detecterMatch3Lignes();
    this.detecterMatch3Colonnes();
  }

  detecterMatch3Lignes() {
    for (let l = 0; l < this.nbLigne; l++) {
      for (let c = 0; c < this.nbColonne - 2; c++) {
        while (c < this.nbColonne - 2 && this.tabCookies[l][c].type === this.tabCookies[l][c + 1].type && this.tabCookies[l][c].type === this.tabCookies[l][c + 2].type) {
          this.tabCookies[l][c].selectionnee();
          this.tabCookies[l][c + 1].selectionnee();
          this.tabCookies[l][c + 2].selectionnee();
          c++;
        }
      }
    }
  }

  detecterMatch3Colonnes() {
    for (let c = 0; c < this.nbColonne; c++) {
      for (let l = 0; l < this.nbLigne - 2; l++) {
        while (l < this.nbLigne - 2 && this.tabCookies[l][c].type === this.tabCookies[l + 1][c].type && this.tabCookies[l][c].type === this.tabCookies[l + 2][c].type) {
          this.tabCookies[l][c].selectionnee();
          this.tabCookies[l + 1][c].selectionnee();
          this.tabCookies[l + 2][c].selectionnee();
          l++;
        }
      }
    }
  }



  detecterMatchDisparait() {
    this.detecterMatch3LignesDisparait();
    this.detecterMatch3ColonnesDisparait();
  }

  detecterMatch3LignesDisparait() {

    for (let l = 0; l < this.nbLigne; l++) {
      for (let c = 0; c < this.nbColonne - 2; c++) {
        while (c < this.nbColonne - 2 && this.tabCookies[l][c].type === this.tabCookies[l][c + 1].type && this.tabCookies[l][c].type === this.tabCookies[l][c + 2].type) {
          this.tabCookies[l][c].disparait();
          this.tabCookies[l][c + 1].disparait();
          this.tabCookies[l][c + 2].disparait();
          c++;
        }
      }
    }
  }

  detecterMatch3ColonnesDisparait() {
    for (let c = 0; c < this.nbColonne; c++) {
      for (let l = 0; l < this.nbLigne - 2; l++) {
        while (l < this.nbLigne - 2 && this.tabCookies[l][c].type === this.tabCookies[l + 1][c].type && this.tabCookies[l][c].type === this.tabCookies[l + 2][c].type) {
          this.tabCookies[l][c].disparait();
          this.tabCookies[l + 1][c].disparait();
          this.tabCookies[l + 2][c].disparait();
          l++;
        }
      }
    }
  }




  /**
   * Initialisation du niveau de départ. Le paramètre est le nombre de cookies différents
   * dans la grille. 4 types (4 couleurs) = facile de trouver des possibilités de faire
   * des groupes de 3. 5 = niveau moyen, 6 = niveau difficile
   *
   * Améliorations : 1) s'assurer que dans la grille générée il n'y a pas déjà de groupes
   * de trois. 2) S'assurer qu'il y a au moins 1 possibilité de faire un groupe de 3 sinon
   * on a perdu d'entrée. 3) réfléchir à des stratégies pour générer des niveaux plus ou moins
   * difficiles.
   *
   * On verra plus tard pour les améliorations...
   */
  remplirTableauDeCookies(nbDeCookiesDifferents) {
    let type;
    this.tabCookies = create2DArray(this.nbLigne);

    for (let i = 0; i < this.nbLigne; i++) {
      for (let j = 0; j < this.nbColonne; j++) {
        type = _.random(nbDeCookiesDifferents - 1);
        //type = Math.floor(nbDeCookiesDifferents * Math.random());
        this.tabCookies[i][j] = new Cookie(type, i, j);
      }
    }
  }

}
