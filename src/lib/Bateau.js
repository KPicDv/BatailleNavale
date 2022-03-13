export default class Bateau {
    constructor (cellules) {
        this.cellules = cellules
        this.cellulesTouchees = []

        this.cellules.forEach(cellule => {
            cellule.bateau = this
        })
    }

    get coule() {
        return this.cellules.length == this.cellulesTouchees.length
    }
}