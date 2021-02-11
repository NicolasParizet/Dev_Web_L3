class Rectangle {
    constructor(x, y, vx, l, h, c) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.l = l;
      this.h = h;
      this.angle = 0;
      this.couleur = c;
    }
  
    draw(ctx) {
        // bonne pratique = sauver et restaurer le contexte graphique
        // quand on modifie des propriétés globales comme la couleur
        // le repère global, etc.

      ctx.save();

      ctx.translate(this.x, this.y);

      //pour qu'il tourne autours de son centre
      ctx.translate(this.l/2, this.h/2);
      ctx.rotate(this.angle);
      ctx.translate(-this.l/2, -this.h/2);


      ctx.fillStyle = this.couleur;
      ctx.fillRect(0, 0, this.l, this.h);

      ctx.restore();
    }
  
    move() {
        this.x += this.vx;
        //this.angle+= 0.1;
    }
  }
  