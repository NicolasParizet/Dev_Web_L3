class Mot {
    constructor(mot) {
        this.mot = mot.toUpperCase();
        this.trouve = false;
    }
}

class AbsListeMots extends Abs {
    constructor() {
        super();
        this.listes = [];
        this.listes.push(new Mot("croc"));
        this.listes.push(new Mot("solution"));
        this.listes.push(new Mot("lac"));
        this.listes.push(new Mot("AAAA"));
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.MOT_TAPE) {
            let mot = piecejointe;
            let recherche = this.listes.filter(m => {
                let r = (m.mot == mot) ;
                if (r) m.trouve = true; // par effet de bord, le mot sera bien modifié
                return r;
            });
            result = (recherche.length > 0);
        }
        else if (message == MESSAGE.LISTE) {
            this.listes.forEach(m => {
                if (m.trouve) this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.MOT_TROUVE, m.mot);
                else this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.MOT_NON_TROUVE, m.mot);
            });
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }
}


class PresListeMots extends Pres {
    constructor() {
        super();
        this.ul = document.createElement("ul");
        this.ul.innerHTML = "<li>-</li>";
        let aside = document.createElement("aside");
        // ici on peut mettre du style, ou alors dans le css
        aside.innerHTML="Liste des mots : ";
        aside.appendChild(this.ul);
        document.body.appendChild(aside);
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.CLEAR) {
            this.ul.innerHTML = "";
        }
        else if (message == MESSAGE.MOT_TROUVE) {
            let li = document.createElement("li");
            li.innerHTML = "<span style='text-decoration: line-through;'>"+piecejointe+"</span>";
            this.ul.appendChild(li);
        } else if (message == MESSAGE.MOT_NON_TROUVE) {
            let li = document.createElement("li");
            li.innerHTML = "<span>"+piecejointe+"</span>";
            this.ul.appendChild(li);
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

}

class CtrlListeMots extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    reçoitMessageDuParent(message, piecejointe) {
        if (message == MESSAGE.MOT_TAPE) {
            let trouve = this.abs.reçoitMessage(message, piecejointe);
            if (trouve) {
                this.pres.reçoitMessage(MESSAGE.CLEAR);
                this.abs.reçoitMessage(MESSAGE.LISTE);
            }
        }
        else if (message == MESSAGE.INIT) {
            this.pres.reçoitMessage(MESSAGE.CLEAR);
            this.abs.reçoitMessage(MESSAGE.LISTE);
        }
        else super.reçoitMessageDUnEnfant(message, piecejointe);
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        if (message == MESSAGE.MOT_TROUVE) this.pres.reçoitMessage(message, piecejointe);
        else if (message == MESSAGE.MOT_NON_TROUVE) this.pres.reçoitMessage(message, piecejointe);
        else super.reçoitMessageDeLAbstraction(message, piecejointe);
    }
}
