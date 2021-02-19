// 1 On définisse une sorte de "programme principal"
// le point d'entrée du code qui sera appelée dès que la
// page ET SES RESSOURCES est chargée

window.onload = init;

let grille;

function init() {
  let ligne = 12;
  let colonne = 8;
  let separator = [
    "1x5",
    "4x1",
    "4x7",
    "5x3",
    "6x5",
    "7x8",
    "8x4",
    "9x2",
    "9x6",
    "10x3",
    "11x5",
    "12x4"
  ];

  let legend = ["definition1", "def2", "def3", "...."];
  //let rep = ["a", "b", "c"];
  let rep = ["aero-bee", "testeree"];
  grille = new Grille(ligne, colonne, separator, rep, legend);
  grille.makeGrille();
  //grille.writeLegend(definition);
}
