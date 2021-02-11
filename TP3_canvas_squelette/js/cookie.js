class Cookie {
  constructor(type, ligne, colonne, image) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;

    this.htmlImage = image; // pour canvas
    this.currentY = 0;
  }

  draw(ctx, x, y, l, h) { //
    ctx.save();

    let type = this.htmlImage;
    ctx.drawImage(type, x, y, l, h);
    /*if(this.currentY < y){
      this.currentY +=5;
    }*/
    ctx.restore(); 
  }
}
