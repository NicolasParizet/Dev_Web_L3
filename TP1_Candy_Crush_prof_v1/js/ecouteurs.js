function changerVitesse(val) {
  console.log("changer vitesse val=" + val);
  tableauRectangle.forEach((r) => {
    r.vx = parseInt(val); // pour changer chaine en entier
  });
}

function changerCouleur(val) {
  tableauRectangle.forEach((r) => {
    r.couleur = val; // pour changer chaine en entier
  });
}

function toucheEnfoncee(evt) {
  console.log("Tocuhe enfoncee " + evt.key);
  switch (evt.key) {
    case "ArrowRight":
        player.vx=5;
      break;
    case "ArrowLeft":
        player.vx =-5;
      break;
  }
}

function toucheRelachee(evt) {
  console.log("Tocuhe relachee " + evt.key);

  player.vx = 0;
}
