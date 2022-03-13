import Cellule from './lib/Cellule'
import Bateau from './lib/Bateau'
import utile from './lib/utile'
import IA from './lib/IA'
import jeu from './lib/jeu'

let bateauxGrilleHaut = []
let bateauxGrilleBas = []
const cellulesGrilleHaut = []
const cellulesGrilleBas = []

const $tableHaut = document.querySelector('table#haut')
const $tableBas = document.querySelector('table#bas')

const creerGrille = (cellules) => {
    const $tbody = document.createElement('tbody')
    const $tr = document.createElement('tr')
    $tr.appendChild(document.createElement('th'))

    for (let numeroColonne = 0; numeroColonne < 10; numeroColonne++) {
        const $th = document.createElement('th')
        $th.innerText = utile.nombreVersLettre(numeroColonne + 1)
        $tr.appendChild($th)
    }
    $tbody.appendChild($tr)

    for (let numeroLigne = 0; numeroLigne < 10; numeroLigne++) {
        const $tr = document.createElement('tr')

        const $th = document.createElement('th')
        $th.innerText = numeroLigne + 1
        $tr.appendChild($th)

        for (let numeroColonne = 0; numeroColonne < 10; numeroColonne++) {
            const $td = document.createElement('td')
            $tr.appendChild($td)
            cellules.push(new Cellule(numeroLigne, numeroColonne, $td))
        }
        
        $tbody.appendChild($tr)
    }

    return $tbody
}

const getCellule = (cellules, numeroCellule) => {
    const cellule = cellules[numeroCellule]
    if (!cellule) console.log(numeroCellule);
    if (cellule.bateau) {
        return null
    }

    return cellule
}

const genererBateau = (cellules, taille) => {
    let cellulesBateau = []
    let cellule = null

    do {
        let numeroCellule = utile.aleatoire(0, 99)
        const numeroCelluleDebut = numeroCellule
        const horizontal = utile.aleatoire(1, 2) == 1
        let sens = utile.aleatoire(1, 2) == 1 ? 1 : -1

        cellulesBateau = []
        cellule = getCellule(cellules, numeroCellule)
        cellulesBateau.push(cellule)

        for (let i = 1; i < taille; i++) {
            if (cellule) {
                const numeroCelluleSuivante = numeroCellule + ((horizontal ? 1 : 10) * sens)
                let valide = numeroCelluleSuivante < 100 && numeroCelluleSuivante >= 0

                if (horizontal) {
                    if (sens == 1) {
                        valide &&= numeroCelluleSuivante % 10 > numeroCellule % 10
                    } else {
                        valide &&= numeroCelluleSuivante % 10 < numeroCellule % 10
                    }
                } else {
                    if (sens == 1) {
                        valide &&= numeroCelluleSuivante == numeroCellule + 10
                    } else {
                        valide &&= numeroCelluleSuivante == numeroCellule - 10
                    }
                }

                if (valide) {
                    numeroCellule = + numeroCelluleSuivante
                    cellule = getCellule(cellules, numeroCellule)
                    cellulesBateau.push(cellule)
                } else {
                    sens = -sens
                    numeroCellule = numeroCelluleDebut + ((horizontal ? 1 : 10) * sens)
                    cellule = getCellule(cellules, numeroCellule)
                    cellulesBateau.push(cellule)
                }
            } else {
                break
            }
        }
    } while (cellule == null)

    return new Bateau(cellulesBateau)
}

const genererBateaux = (cellules) => {
    return [
        genererBateau(cellules, 2),
        genererBateau(cellules, 3),
        genererBateau(cellules, 3),
        genererBateau(cellules, 4),
        genererBateau(cellules, 5),
    ]
}

$tableHaut.appendChild(creerGrille(cellulesGrilleHaut))
$tableBas.appendChild(creerGrille(cellulesGrilleBas))

bateauxGrilleHaut = genererBateaux(cellulesGrilleHaut)
bateauxGrilleBas = genererBateaux(cellulesGrilleBas)

cellulesGrilleBas.filter(c => c.bateau).forEach(c => c.elementHtml.className = 'bateau')

const stopClicGrilleHaut = () => {
    cellulesGrilleHaut.forEach((cellule) => {
        cellule.elementHtml.onclick = null
    })
}

const victoireIA =() => {
    jeu.ajouterLog('VICTOIRE !', false)
    cellulesGrilleHaut.filter(c => c.bateau && !c.elementHtml.className).forEach(c => c.elementHtml.className = 'bateau')
    stopClicGrilleHaut()
}
const ia = new IA(cellulesGrilleBas, victoireIA)

cellulesGrilleHaut.forEach((cellule) => {
    cellule.elementHtml.onclick = () => {
        const type = jeu.jouerTour(cellule)
        jeu.ajouterLogActionCellule(cellule, type, true)
        cellule.elementHtml.onclick = null

        if (type == jeu.CIBLE_COULEE && !bateauxGrilleHaut.some((bateau) => !bateau.coule)) {
            jeu.ajouterLog('VICTOIRE !', true)
            stopClicGrilleHaut()
        } else {
            ia.jouer()
        }
    }
})
