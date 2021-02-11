class AbsCiment extends Abs {
    constructor() {
        super();
        this.nbTentatives = 0;
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.MOT_TAPE) {
            this.nbTentatives += 1;
            result = this.nbTentatives;
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }
}


class PresCiment extends Pres {
    constructor() {
        super();
        this.spanCpt = document.createElement("span");
        this.spanCpt.innerHTML = "-";
        let aside = document.createElement("aside");
        // ici on peut mettre du style, ou alors dans le css
        aside.innerHTML="Nb tentative(s) : ";
        aside.appendChild(this.spanCpt);
        document.body.appendChild(aside);
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.MOT_TAPE) {
            this.spanCpt.innerHTML = piecejointe;
            result = piecejointe;
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

}

class CtrlCiment extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    /**
     * pour lancer l'initialisation dans la hierarchie
     */
    init() {
        this.enfants.forEach(e => e.reçoitMessageDuParent(MESSAGE.INIT));
    }

    reçoitMessageDUnEnfant(message, piecejointe, ctrl) {
        if (message == MESSAGE.MOT_TAPE) {
            let nb = this.abs.reçoitMessage(message, piecejointe);
            this.pres.reçoitMessage(message, nb);
            this.enfants.forEach(e => {
                if(e != ctrl) e.reçoitMessageDuParent(MESSAGE.MOT_TAPE, piecejointe);
            } );

        }
        else super.reçoitMessageDUnEnfant(message, piecejointe);
    }
}
