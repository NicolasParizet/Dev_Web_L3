// 1 On définisse une sorte de "programme principal"
// le point d'entrée du code qui sera appelée dès que la
// page ET SES RESSOURCES est chargée

window.onload = init;

let canvas, ctx, l, h;
/*
let r1 = {
    x: 10,
    y: 10,
    vx:10,
    l: 100,
    h:100,
    couleur: "orange" 
} */
let r1, r2;
let tableauRectangle = [];
let player;

function init() {
  console.log("Page et ressources prêtes à l'emploi");
  // appelée quand la page et ses ressources sont prêtes.
  // On dit aussi que le DOM est ready (en fait un peu plus...)


  // à partir de là on  va pouvoir accèder via la selector API aux
  // éléments HTML et les utiliser via leurs propriétés, méthodes, évenements
  // ce sont des objets

  canvas = document.querySelector("#myCanvas");
  l = canvas.width;
  h = canvas.height;

  console.log("largeur = " + l);

  // pour dessiner : on utilise un objet "contexte" qu'on obtient à partir
  // du canvas. VOIR MOOC HTML5 coding essential et best practices module 3
  ctx = canvas.getContext("2d");

  /*
    // x, et y du coin en haut à gauche du rectangle
    // et largeur hauteur du rectangle
    ctx.fillStyle = r1.couleur;
    ctx.fillRect(r1.x, r1.y, r1.l, r1.h);

    ctx.strokeStyle = r2.couleur;
    ctx.lineWidth=10;
    ctx.strokeRect(r2.x, r2.y, r2.l, r2.h);
    */

    // création des objets à animer
    creerDesRectangles(10);
    player = new Player();

    document.addEventListener("keydown", toucheEnfoncee);
    document.addEventListener("keyup", toucheRelachee);

  // ici on démarre l'animation
  requestAnimationFrame(boucleAnimation);
}

function boucleAnimation(time) {
  // 1 - on efface le contenu du canvas
  ctx.clearRect(0, 0, l, h);

  // 2 - On dessine
  //draw();

  // 3 - On déplace les objets, on teste s'il y a des collisions, on regarde
  //     l'état des gamepads, etc. on modifiera des propriétés des objets comme
  // la position, la vitesse etc.
  update();

  // 4 - on demande au navigateur de re-exécurer la boucle d'animation
  // 60 fois par secondes, si possible. C'est une exécution asynchrone
  requestAnimationFrame(boucleAnimation);
}

function update() {
    // dessiner le joueur
    player.draw(ctx);
    player.move();

  // gérer le nouvel état des objets animés
  tableauRectangle.forEach((r) => {
    r.draw(ctx);
    testeCollisionsAvecBords(r);
    r.move();
  });
}



function creerDesRectangles(nb) {
    
    for(let i=0;i < nb; i++) {
        let x = l* Math.random();
        let y = h* Math.random();
        let largeur = 5 + 200*Math.random();
        let hauteur = 5 + 200*Math.random();
        let vx = 1 + 20* Math.random();
        let r = Math.abs(255*Math.random());
        let g = Math.abs(255*Math.random());
        let b = Math.abs(255*Math.random());
        let couleur = "rgb(" + r + "," + g + "," + b +")";

        let rect = new Rectangle(x, y, vx, largeur, hauteur, couleur);

        // on le rajoute au tableau
        tableauRectangle.push(rect);

    }
}