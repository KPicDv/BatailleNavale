const CIBLE_RATEE = 1
const CIBLE_TOUCHEE = 2
const CIBLE_COULEE = 3

const jouerTour = (cellule, ) => {
    cellule.elementHtml.innerHTML = 'X'

    if (cellule.bateau) {
        cellule.bateau.cellulesTouchees.push(cellule)

        if (cellule.bateau.cellulesTouchees.length == cellule.bateau.cellules.length) {
            cellule.bateau.cellules.forEach((celluleBateau) => {
                celluleBateau.elementHtml.className = 'bateau coule'
            })
            return CIBLE_COULEE
        } else {
            cellule.elementHtml.className = 'bateau touche'
            return CIBLE_TOUCHEE
        }
    } else {
        return CIBLE_RATEE
    }
}

const ajouterLogActionCellule = (cellule, type, joueur) => {
    let resultat
    switch (type) {
        case CIBLE_RATEE:
            resultat = 'Cible ratée'
            break;
        case CIBLE_TOUCHEE:
            resultat = 'Cible touchée'
            break;
        case CIBLE_COULEE:
            resultat = 'Cible coulée'
            break;
    }
    ajouterLog('[' + cellule.lettreColonne + cellule.numeroLigne + '] ' + resultat + '.', joueur)
}

const ajouterLog = (log, joueur) => {
    const $logs = document.querySelector('div#logs-' + (joueur ? 'joueur' : 'ia') + ' .logs-contenu')
    const $log = document.createElement('div')
    $log.innerText = log
    $logs.appendChild($log)
    $logs.scroll(0, $logs.children.length * 50)
}

export default {
    CIBLE_RATEE,
    CIBLE_TOUCHEE,
    CIBLE_COULEE,
    jouerTour,
    ajouterLogActionCellule,
    ajouterLog
}