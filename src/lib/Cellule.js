import utile from "./utile"

export default class Cellule {
    constructor (numeroLigne, numeroColonne, elementHtml) {
        this.numeroLigne = numeroLigne + 1
        this.numeroColonne = numeroColonne + 1
        this.lettreColonne = utile.nombreVersLettre(this.numeroColonne)
        this.coordonnees = this.lettreColonne + this.numeroLigne
        this.elementHtml = elementHtml
        this.bateau = null
    }
}