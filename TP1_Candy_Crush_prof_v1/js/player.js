class Player {
    constructor() {
      this.x = 10;
      this.y = 10;
      this.l = 20;
      this.h = 20;
      this.vx = 0;
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

      ctx.fillRect(0, 0, this.l, this.h);

      ctx.restore();
    }

    move() {
        this.x += this.vx;
    }
  }
  