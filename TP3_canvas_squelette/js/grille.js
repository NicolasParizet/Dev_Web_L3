/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
class Grille {
  tabCookies = [];

  constructor(l, c, canvasLargeur, canvasHauteur, assetsLoaded) {
    this.nbLignes = l;
    this.nbColonnes = c;
    this.canvasLargeur = canvasLargeur;
    this.canvasHauteur = canvasHauteur;
    this.cookiesCliquees = [];
    this.largeurColonnes = canvasLargeur / c;
    this.hauteurLignes = canvasHauteur / l;
    this.assets = assetsLoaded;

    // on passe en paramètre le nombre de cookies différents. 4 = facile, 5 = moyen,
    // 6 = difficile
    this.remplirTableauDeCookies(6); // valeurs possible : 4, 5, 6 par ex
  }

  drawGrille(ctx) {
    ctx.save();
    
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";

    //Lignes horizontal
    for(let l= this.hauteurLignes; l<this.canvasHauteur-1; l += this.hauteurLignes){
      ctx.moveTo(0, l);
      ctx.lineTo(this.canvasLargeur,l);
    }

    for(let c = this.hauteurLignes; c<this.canvasHauteur-1; c += this.hauteurLignes){
      ctx.moveTo(c, 0);
      ctx.lineTo(c,this.canvasHauteur);
    }

    ctx.stroke();
    ctx.restore();
  }
  /**
   * parcours la liste des divs de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies(ctx) {
    // TODO dessiner les cookies dans la grille
    ctx.save();

    let x = 0;
    let y = 0;

    for (let l = 0; l<this.nbLignes; l++){
      x = 0; // reset la position verticale
      for (let c= 0; c<this.nbColonnes; c++){
        //console.log("x = "+ x + ", y = ",y);
       this.tabCookies[l][c].draw(ctx, x, y,this.largeurColonnes,this.hauteurLignes);  //Cookie.draw()
        x += this.hauteurLignes;
      }
      y += this.largeurColonnes;
    }

    ctx.restore();
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
    this.tabCookies = create2DArray(this.nbLignes);

    // TODO : remplir le tableau avec des cookies au hasard
    let cookie;
    let type
    for(let l = 0; l < this.nbLignes; l++){
      for(let c = 0; c < this.nbColonnes; c++){
        type = _.random(nbDeCookiesDifferents-1); //valeur aléat en fct du nb de cookies différents
        switch(type){
          case 0 : 
            cookie = new Cookie(type,l,c,this.assets.croissant);
            break;
          case 1 : 
            cookie = new Cookie(type,l,c,this.assets.cupcake);
            break;
          case 2 : 
            cookie = new Cookie(type,l,c,this.assets.danish);
            break;
          case 3 : 
            cookie = new Cookie(type,l,c,this.assets.donut);
            break;
          case 4 : 
            cookie = new Cookie(type,l,c,this.assets.macaroon);
            break;
          case 5 : 
            cookie = new Cookie(type,l,c,this.assets.sugarCookie);
            break;
        }
        this.tabCookies[l][c] = cookie;
      }
    }
  }
}
