import jeu from "./jeu"
import utile from "./utile"

export default class IA {
    constructor (cellules, onVictoire) {
        this.onVictoire = onVictoire
        this.cellulesJouables = cellules
        this.cellulesRatees = []
        this.cellulesTouchees = []
        this.cellulesCoulees = []
        this.prochainesCellules = {
            gauche: [],
            droite: [],
            haut: [],
            bas: []
        }
    }

    jouer(test = null) {
        const prochainesCellules = []
        let celluleInfo
        let cellule

        const taillesBateaux = [2, 3, 3, 4, 5]
        const bateauxCoules = [...new Set(this.cellulesCoulees.map(c => c.bateau))]
        
        for (const bateau of bateauxCoules) {
            const position = taillesBateaux.indexOf(bateau.cellules.length)
            taillesBateaux.splice(position, 1)
        }
        const taillePlusPetitBateauRestant = taillesBateaux.length ? taillesBateaux[0] : 0

        if (test) {
            cellule = this.cellulesJouables.find((c) => c.coordonnees == test)
        } else {
            if (
                !this.prochainesCellules.gauche.length &&
                !this.prochainesCellules.droite.length &&
                !this.prochainesCellules.haut.length &&
                !this.prochainesCellules.bas.length &&
                this.cellulesTouchees.length
            ) {
                const celluleTouchee = this.cellulesTouchees[0]
                this.prochainesCellules = {
                    gauche: this.getCellulesSuivantes(celluleTouchee, this.cellulesJouables.filter((c) => c.numeroLigne == celluleTouchee.numeroLigne && c.numeroColonne < celluleTouchee.numeroColonne).reverse()),
                    droite: this.getCellulesSuivantes(celluleTouchee, this.cellulesJouables.filter((c) => c.numeroLigne == celluleTouchee.numeroLigne && c.numeroColonne > celluleTouchee.numeroColonne)),
                    haut: this.getCellulesSuivantes(celluleTouchee, this.cellulesJouables.filter((c) => c.numeroLigne > celluleTouchee.numeroLigne && c.numeroColonne == celluleTouchee.numeroColonne)),
                    bas: this.getCellulesSuivantes(celluleTouchee, this.cellulesJouables.filter((c) => c.numeroLigne < celluleTouchee.numeroLigne && c.numeroColonne == celluleTouchee.numeroColonne).reverse())
                }
            }

            if (this.prochainesCellules.gauche.length) {
                prochainesCellules.push({
                    liste: this.prochainesCellules.gauche,
                    cellule: this.prochainesCellules.gauche[0]
                })
            }
            if (this.prochainesCellules.droite.length) {
                prochainesCellules.push({
                    liste: this.prochainesCellules.droite,
                    cellule: this.prochainesCellules.droite[0]
                })
            }
            if (this.prochainesCellules.haut.length) {
                prochainesCellules.push({
                    liste: this.prochainesCellules.haut,
                    cellule: this.prochainesCellules.haut[0]
                })
            }
            if (this.prochainesCellules.bas.length) {
                prochainesCellules.push({
                    liste: this.prochainesCellules.bas,
                    cellule: this.prochainesCellules.bas[0]
                })
            }
            
            if (prochainesCellules.length) {
                const position = utile.aleatoire(0, prochainesCellules.length - 1)
                celluleInfo = prochainesCellules.splice(position, 1)[0]
                cellule = celluleInfo.cellule
            } else {
                const cellulesJouablesInfo = this.cellulesJouables.map((cellule) => {
                    const cellules = this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne == cellule.numeroLigne && c.numeroColonne < cellule.numeroColonne).reverse())
                        .concat(this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne == cellule.numeroLigne && c.numeroColonne > cellule.numeroColonne)))
                        .concat(this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne > cellule.numeroLigne && c.numeroColonne == cellule.numeroColonne)))
                        .concat(this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne < cellule.numeroLigne && c.numeroColonne == cellule.numeroColonne).reverse()))

                    return {
                        nombreCellules: cellules.length + 1,
                        cellule
                    }
                })

                this.cellulesJouables = cellulesJouablesInfo
                    .filter(c => c.nombreCellules >= taillePlusPetitBateauRestant)
                    .map(c => c.cellule)

                cellulesJouablesInfo.sort((a, b) => {
                    if (a.nombreCellules > b.nombreCellules) return -1
                    if (a.nombreCellules < b.nombreCellules) return 1
                    return 0
                })
                const maxNombreCellules = cellulesJouablesInfo[0].nombreCellules

                const cellulesJouables = cellulesJouablesInfo.filter((c) => {
                    return c.nombreCellules == maxNombreCellules
                })
                const numeroCellule = utile.aleatoire(0, cellulesJouables.length - 1)
                cellule = cellulesJouables[numeroCellule].cellule
            }
        }

        const type = jeu.jouerTour(cellule)
        jeu.ajouterLogActionCellule(cellule, type, false)

        switch (type) {
            case jeu.CIBLE_RATEE:
                this.ajouterCellulesRatees(cellule)

                if (celluleInfo) {
                    celluleInfo.liste.length = 0
                }
                break;
            case jeu.CIBLE_TOUCHEE:
                this.ajouterCellulesTouchees(cellule)

                if (celluleInfo) {
                    const position = celluleInfo.liste.indexOf(cellule)
                    if (position != -1) {
                        celluleInfo.liste.splice(position, 1)
                    }
                    
                    if (celluleInfo.liste == this.prochainesCellules.gauche || celluleInfo.liste == this.prochainesCellules.droite) {
                        this.prochainesCellules.haut.length = 0
                        this.prochainesCellules.bas.length = 0
                    } else {
                        this.prochainesCellules.gauche.length = 0
                        this.prochainesCellules.droite.length = 0
                    }
                } else {
                    this.prochainesCellules = {
                        gauche: this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne == cellule.numeroLigne && c.numeroColonne < cellule.numeroColonne).reverse()),
                        droite: this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne == cellule.numeroLigne && c.numeroColonne > cellule.numeroColonne)),
                        haut: this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne > cellule.numeroLigne && c.numeroColonne == cellule.numeroColonne)),
                        bas: this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne < cellule.numeroLigne && c.numeroColonne == cellule.numeroColonne).reverse())
                    }
                }

                break;
            case jeu.CIBLE_COULEE:
                cellule.bateau.cellules.forEach((c) => {
                    this.ajouterCellulesCoulees(c)
                })
                this.prochainesCellules = {
                    gauche: [],
                    droite: [],
                    haut: [],
                    bas: []
                }

                if (taillesBateaux.length == 1) this.onVictoire()
                break;
        }
    }

    getCellulesSuivantes(celluleDepart, liste) {
        const listeValide = []
        let cellulePrecedente = celluleDepart

        for (const cellule of liste) {
            const differenceLignes = cellule.numeroLigne - cellulePrecedente.numeroLigne
            const differenceColonnes = cellule.numeroColonne - cellulePrecedente.numeroColonne
            
            if (differenceLignes > 1 || differenceLignes < -1 || differenceColonnes > 1 || differenceColonnes < -1) {
                return listeValide
            }
            listeValide.push(cellule)
            cellulePrecedente = cellule
        }
        return listeValide
    }

    ajouterCellulesRatees(cellule) {
        this.supprimerCelluleJouable(cellule)
        this.cellulesRatees.push(cellule)
    }

    ajouterCellulesTouchees(cellule) {
        this.supprimerCelluleJouable(cellule)
        this.cellulesTouchees.push(cellule)
    }

    ajouterCellulesCoulees(cellule) {
        this.supprimerCelluleJouable(cellule)
        this.supprimerCelluleTouchee(cellule)
        this.cellulesCoulees.push(cellule)
    }

    supprimerCelluleJouable(cellule) {
        const position = this.cellulesJouables.indexOf(cellule)
        if (position != -1) {
            this.cellulesJouables.splice(position, 1)
        }
    }

    supprimerCelluleTouchee(cellule) {
        const position = this.cellulesTouchees.indexOf(cellule)
        if (position != -1) {
            this.cellulesTouchees.splice(position, 1)
        }
    }
}