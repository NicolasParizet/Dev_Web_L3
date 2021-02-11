function testeCollisionsAvecBords(r) {
    if (r.x + r.l > l) {
        // on se remet au point de contact
        r.x = l - r.l;
  
        // on change de sens
        r.vx = -r.vx;
      } else if (r.x < 0) {
        // on se remet au point de contact
        r.x = 0;
  
        // on change de sens
        r.vx = -r.vx;
      }
}
