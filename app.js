/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_Cellule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Cellule */ \"./src/lib/Cellule.js\");\n/* harmony import */ var _lib_Bateau__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/Bateau */ \"./src/lib/Bateau.js\");\n/* harmony import */ var _lib_utile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/utile */ \"./src/lib/utile.js\");\n/* harmony import */ var _lib_IA__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/IA */ \"./src/lib/IA.js\");\n/* harmony import */ var _lib_jeu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/jeu */ \"./src/lib/jeu.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nlet bateauxGrilleHaut = []\r\nlet bateauxGrilleBas = []\r\nconst cellulesGrilleHaut = []\r\nconst cellulesGrilleBas = []\r\n\r\nconst $tableHaut = document.querySelector('table#haut')\r\nconst $tableBas = document.querySelector('table#bas')\r\n\r\nconst creerGrille = (cellules) => {\r\n    const $tbody = document.createElement('tbody')\r\n    const $tr = document.createElement('tr')\r\n    $tr.appendChild(document.createElement('th'))\r\n\r\n    for (let numeroColonne = 0; numeroColonne < 10; numeroColonne++) {\r\n        const $th = document.createElement('th')\r\n        $th.innerText = _lib_utile__WEBPACK_IMPORTED_MODULE_2__[\"default\"].nombreVersLettre(numeroColonne + 1)\r\n        $tr.appendChild($th)\r\n    }\r\n    $tbody.appendChild($tr)\r\n\r\n    for (let numeroLigne = 0; numeroLigne < 10; numeroLigne++) {\r\n        const $tr = document.createElement('tr')\r\n\r\n        const $th = document.createElement('th')\r\n        $th.innerText = numeroLigne + 1\r\n        $tr.appendChild($th)\r\n\r\n        for (let numeroColonne = 0; numeroColonne < 10; numeroColonne++) {\r\n            const $td = document.createElement('td')\r\n            $tr.appendChild($td)\r\n            cellules.push(new _lib_Cellule__WEBPACK_IMPORTED_MODULE_0__[\"default\"](numeroLigne, numeroColonne, $td))\r\n        }\r\n        \r\n        $tbody.appendChild($tr)\r\n    }\r\n\r\n    return $tbody\r\n}\r\n\r\nconst getCellule = (cellules, numeroCellule) => {\r\n    const cellule = cellules[numeroCellule]\r\n    if (!cellule) console.log(numeroCellule);\r\n    if (cellule.bateau) {\r\n        return null\r\n    }\r\n\r\n    return cellule\r\n}\r\n\r\nconst genererBateau = (cellules, taille) => {\r\n    let cellulesBateau = []\r\n    let cellule = null\r\n\r\n    do {\r\n        let numeroCellule = _lib_utile__WEBPACK_IMPORTED_MODULE_2__[\"default\"].aleatoire(0, 99)\r\n        const numeroCelluleDebut = numeroCellule\r\n        const horizontal = _lib_utile__WEBPACK_IMPORTED_MODULE_2__[\"default\"].aleatoire(1, 2) == 1\r\n        let sens = _lib_utile__WEBPACK_IMPORTED_MODULE_2__[\"default\"].aleatoire(1, 2) == 1 ? 1 : -1\r\n\r\n        cellulesBateau = []\r\n        cellule = getCellule(cellules, numeroCellule)\r\n        cellulesBateau.push(cellule)\r\n\r\n        for (let i = 1; i < taille; i++) {\r\n            if (cellule) {\r\n                const numeroCelluleSuivante = numeroCellule + ((horizontal ? 1 : 10) * sens)\r\n                let valide = numeroCelluleSuivante < 100 && numeroCelluleSuivante >= 0\r\n\r\n                if (horizontal) {\r\n                    if (sens == 1) {\r\n                        valide &&= numeroCelluleSuivante % 10 > numeroCellule % 10\r\n                    } else {\r\n                        valide &&= numeroCelluleSuivante % 10 < numeroCellule % 10\r\n                    }\r\n                } else {\r\n                    if (sens == 1) {\r\n                        valide &&= numeroCelluleSuivante == numeroCellule + 10\r\n                    } else {\r\n                        valide &&= numeroCelluleSuivante == numeroCellule - 10\r\n                    }\r\n                }\r\n\r\n                if (valide) {\r\n                    numeroCellule = + numeroCelluleSuivante\r\n                    cellule = getCellule(cellules, numeroCellule)\r\n                    cellulesBateau.push(cellule)\r\n                } else {\r\n                    sens = -sens\r\n                    numeroCellule = numeroCelluleDebut + ((horizontal ? 1 : 10) * sens)\r\n                    cellule = getCellule(cellules, numeroCellule)\r\n                    cellulesBateau.push(cellule)\r\n                }\r\n            } else {\r\n                break\r\n            }\r\n        }\r\n    } while (cellule == null)\r\n\r\n    return new _lib_Bateau__WEBPACK_IMPORTED_MODULE_1__[\"default\"](cellulesBateau)\r\n}\r\n\r\nconst genererBateaux = (cellules) => {\r\n    return [\r\n        genererBateau(cellules, 2),\r\n        genererBateau(cellules, 3),\r\n        genererBateau(cellules, 3),\r\n        genererBateau(cellules, 4),\r\n        genererBateau(cellules, 5),\r\n    ]\r\n}\r\n\r\n$tableHaut.appendChild(creerGrille(cellulesGrilleHaut))\r\n$tableBas.appendChild(creerGrille(cellulesGrilleBas))\r\n\r\nbateauxGrilleHaut = genererBateaux(cellulesGrilleHaut)\r\nbateauxGrilleBas = genererBateaux(cellulesGrilleBas)\r\n\r\ncellulesGrilleBas.filter(c => c.bateau).forEach(c => c.elementHtml.className = 'bateau')\r\n\r\nconst stopClicGrilleHaut = () => {\r\n    cellulesGrilleHaut.forEach((cellule) => {\r\n        cellule.elementHtml.onclick = null\r\n    })\r\n}\r\n\r\nconst victoireIA =() => {\r\n    _lib_jeu__WEBPACK_IMPORTED_MODULE_4__[\"default\"].ajouterLog('VICTOIRE !', false)\r\n    cellulesGrilleHaut.filter(c => c.bateau && !c.elementHtml.className).forEach(c => c.elementHtml.className = 'bateau')\r\n    stopClicGrilleHaut()\r\n}\r\nconst ia = new _lib_IA__WEBPACK_IMPORTED_MODULE_3__[\"default\"](cellulesGrilleBas, victoireIA)\r\n\r\ncellulesGrilleHaut.forEach((cellule) => {\r\n    cellule.elementHtml.onclick = () => {\r\n        const type = _lib_jeu__WEBPACK_IMPORTED_MODULE_4__[\"default\"].jouerTour(cellule)\r\n        _lib_jeu__WEBPACK_IMPORTED_MODULE_4__[\"default\"].ajouterLogActionCellule(cellule, type, true)\r\n        cellule.elementHtml.onclick = null\r\n\r\n        if (type == _lib_jeu__WEBPACK_IMPORTED_MODULE_4__[\"default\"].CIBLE_COULEE && !bateauxGrilleHaut.some((bateau) => !bateau.coule)) {\r\n            _lib_jeu__WEBPACK_IMPORTED_MODULE_4__[\"default\"].ajouterLog('VICTOIRE !', true)\r\n            stopClicGrilleHaut()\r\n        } else {\r\n            ia.jouer()\r\n        }\r\n    }\r\n})\r\n\n\n//# sourceURL=webpack://bataille-navale/./src/app.js?");

/***/ }),

/***/ "./src/lib/Bateau.js":
/*!***************************!*\
  !*** ./src/lib/Bateau.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Bateau)\n/* harmony export */ });\nclass Bateau {\r\n    constructor (cellules) {\r\n        this.cellules = cellules\r\n        this.cellulesTouchees = []\r\n\r\n        this.cellules.forEach(cellule => {\r\n            cellule.bateau = this\r\n        })\r\n    }\r\n\r\n    get coule() {\r\n        return this.cellules.length == this.cellulesTouchees.length\r\n    }\r\n}\n\n//# sourceURL=webpack://bataille-navale/./src/lib/Bateau.js?");

/***/ }),

/***/ "./src/lib/Cellule.js":
/*!****************************!*\
  !*** ./src/lib/Cellule.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Cellule)\n/* harmony export */ });\n/* harmony import */ var _utile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utile */ \"./src/lib/utile.js\");\n\r\n\r\nclass Cellule {\r\n    constructor (numeroLigne, numeroColonne, elementHtml) {\r\n        this.numeroLigne = numeroLigne + 1\r\n        this.numeroColonne = numeroColonne + 1\r\n        this.lettreColonne = _utile__WEBPACK_IMPORTED_MODULE_0__[\"default\"].nombreVersLettre(this.numeroColonne)\r\n        this.coordonnees = this.lettreColonne + this.numeroLigne\r\n        this.elementHtml = elementHtml\r\n        this.bateau = null\r\n    }\r\n}\n\n//# sourceURL=webpack://bataille-navale/./src/lib/Cellule.js?");

/***/ }),

/***/ "./src/lib/IA.js":
/*!***********************!*\
  !*** ./src/lib/IA.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ IA)\n/* harmony export */ });\n/* harmony import */ var _jeu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jeu */ \"./src/lib/jeu.js\");\n/* harmony import */ var _utile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utile */ \"./src/lib/utile.js\");\n\r\n\r\n\r\nclass IA {\r\n    constructor (cellules, onVictoire) {\r\n        this.onVictoire = onVictoire\r\n        this.cellulesJouables = cellules\r\n        this.cellulesRatees = []\r\n        this.cellulesTouchees = []\r\n        this.cellulesCoulees = []\r\n        this.prochainesCellules = {\r\n            gauche: [],\r\n            droite: [],\r\n            haut: [],\r\n            bas: []\r\n        }\r\n    }\r\n\r\n    jouer(test = null) {\r\n        const prochainesCellules = []\r\n        let celluleInfo\r\n        let cellule\r\n\r\n        const taillesBateaux = [2, 3, 3, 4, 5]\r\n        const bateauxCoules = [...new Set(this.cellulesCoulees.map(c => c.bateau))]\r\n        \r\n        for (const bateau of bateauxCoules) {\r\n            const position = taillesBateaux.indexOf(bateau.cellules.length)\r\n            taillesBateaux.splice(position, 1)\r\n        }\r\n        const taillePlusPetitBateauRestant = taillesBateaux.length ? taillesBateaux[0] : 0\r\n\r\n        if (test) {\r\n            cellule = this.cellulesJouables.find((c) => c.coordonnees == test)\r\n        } else {\r\n            if (\r\n                !this.prochainesCellules.gauche.length &&\r\n                !this.prochainesCellules.droite.length &&\r\n                !this.prochainesCellules.haut.length &&\r\n                !this.prochainesCellules.bas.length &&\r\n                this.cellulesTouchees.length\r\n            ) {\r\n                const celluleTouchee = this.cellulesTouchees[0]\r\n                this.prochainesCellules = {\r\n                    gauche: this.getCellulesSuivantes(celluleTouchee, this.cellulesJouables.filter((c) => c.numeroLigne == celluleTouchee.numeroLigne && c.numeroColonne < celluleTouchee.numeroColonne).reverse()),\r\n                    droite: this.getCellulesSuivantes(celluleTouchee, this.cellulesJouables.filter((c) => c.numeroLigne == celluleTouchee.numeroLigne && c.numeroColonne > celluleTouchee.numeroColonne)),\r\n                    haut: this.getCellulesSuivantes(celluleTouchee, this.cellulesJouables.filter((c) => c.numeroLigne > celluleTouchee.numeroLigne && c.numeroColonne == celluleTouchee.numeroColonne)),\r\n                    bas: this.getCellulesSuivantes(celluleTouchee, this.cellulesJouables.filter((c) => c.numeroLigne < celluleTouchee.numeroLigne && c.numeroColonne == celluleTouchee.numeroColonne).reverse())\r\n                }\r\n            }\r\n\r\n            if (this.prochainesCellules.gauche.length) {\r\n                prochainesCellules.push({\r\n                    liste: this.prochainesCellules.gauche,\r\n                    cellule: this.prochainesCellules.gauche[0]\r\n                })\r\n            }\r\n            if (this.prochainesCellules.droite.length) {\r\n                prochainesCellules.push({\r\n                    liste: this.prochainesCellules.droite,\r\n                    cellule: this.prochainesCellules.droite[0]\r\n                })\r\n            }\r\n            if (this.prochainesCellules.haut.length) {\r\n                prochainesCellules.push({\r\n                    liste: this.prochainesCellules.haut,\r\n                    cellule: this.prochainesCellules.haut[0]\r\n                })\r\n            }\r\n            if (this.prochainesCellules.bas.length) {\r\n                prochainesCellules.push({\r\n                    liste: this.prochainesCellules.bas,\r\n                    cellule: this.prochainesCellules.bas[0]\r\n                })\r\n            }\r\n            \r\n            if (prochainesCellules.length) {\r\n                const position = _utile__WEBPACK_IMPORTED_MODULE_1__[\"default\"].aleatoire(0, prochainesCellules.length - 1)\r\n                celluleInfo = prochainesCellules.splice(position, 1)[0]\r\n                cellule = celluleInfo.cellule\r\n            } else {\r\n                const cellulesJouablesInfo = this.cellulesJouables.map((cellule) => {\r\n                    const cellules = this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne == cellule.numeroLigne && c.numeroColonne < cellule.numeroColonne).reverse())\r\n                        .concat(this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne == cellule.numeroLigne && c.numeroColonne > cellule.numeroColonne)))\r\n                        .concat(this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne > cellule.numeroLigne && c.numeroColonne == cellule.numeroColonne)))\r\n                        .concat(this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne < cellule.numeroLigne && c.numeroColonne == cellule.numeroColonne).reverse()))\r\n\r\n                    return {\r\n                        nombreCellules: cellules.length + 1,\r\n                        cellule\r\n                    }\r\n                })\r\n\r\n                this.cellulesJouables = cellulesJouablesInfo\r\n                    .filter(c => c.nombreCellules >= taillePlusPetitBateauRestant)\r\n                    .map(c => c.cellule)\r\n\r\n                cellulesJouablesInfo.sort((a, b) => {\r\n                    if (a.nombreCellules > b.nombreCellules) return -1\r\n                    if (a.nombreCellules < b.nombreCellules) return 1\r\n                    return 0\r\n                })\r\n                const maxNombreCellules = cellulesJouablesInfo[0].nombreCellules\r\n\r\n                const cellulesJouables = cellulesJouablesInfo.filter((c) => {\r\n                    return c.nombreCellules == maxNombreCellules\r\n                })\r\n                const numeroCellule = _utile__WEBPACK_IMPORTED_MODULE_1__[\"default\"].aleatoire(0, cellulesJouables.length - 1)\r\n                cellule = cellulesJouables[numeroCellule].cellule\r\n            }\r\n        }\r\n\r\n        const type = _jeu__WEBPACK_IMPORTED_MODULE_0__[\"default\"].jouerTour(cellule)\r\n        _jeu__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ajouterLogActionCellule(cellule, type, false)\r\n\r\n        switch (type) {\r\n            case _jeu__WEBPACK_IMPORTED_MODULE_0__[\"default\"].CIBLE_RATEE:\r\n                this.ajouterCellulesRatees(cellule)\r\n\r\n                if (celluleInfo) {\r\n                    celluleInfo.liste.length = 0\r\n                }\r\n                break;\r\n            case _jeu__WEBPACK_IMPORTED_MODULE_0__[\"default\"].CIBLE_TOUCHEE:\r\n                this.ajouterCellulesTouchees(cellule)\r\n\r\n                if (celluleInfo) {\r\n                    const position = celluleInfo.liste.indexOf(cellule)\r\n                    if (position != -1) {\r\n                        celluleInfo.liste.splice(position, 1)\r\n                    }\r\n                    \r\n                    if (celluleInfo.liste == this.prochainesCellules.gauche || celluleInfo.liste == this.prochainesCellules.droite) {\r\n                        this.prochainesCellules.haut.length = 0\r\n                        this.prochainesCellules.bas.length = 0\r\n                    } else {\r\n                        this.prochainesCellules.gauche.length = 0\r\n                        this.prochainesCellules.droite.length = 0\r\n                    }\r\n                } else {\r\n                    this.prochainesCellules = {\r\n                        gauche: this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne == cellule.numeroLigne && c.numeroColonne < cellule.numeroColonne).reverse()),\r\n                        droite: this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne == cellule.numeroLigne && c.numeroColonne > cellule.numeroColonne)),\r\n                        haut: this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne > cellule.numeroLigne && c.numeroColonne == cellule.numeroColonne)),\r\n                        bas: this.getCellulesSuivantes(cellule, this.cellulesJouables.filter((c) => c.numeroLigne < cellule.numeroLigne && c.numeroColonne == cellule.numeroColonne).reverse())\r\n                    }\r\n                }\r\n\r\n                break;\r\n            case _jeu__WEBPACK_IMPORTED_MODULE_0__[\"default\"].CIBLE_COULEE:\r\n                cellule.bateau.cellules.forEach((c) => {\r\n                    this.ajouterCellulesCoulees(c)\r\n                })\r\n                this.prochainesCellules = {\r\n                    gauche: [],\r\n                    droite: [],\r\n                    haut: [],\r\n                    bas: []\r\n                }\r\n\r\n                if (taillesBateaux.length == 1) this.onVictoire()\r\n                break;\r\n        }\r\n    }\r\n\r\n    getCellulesSuivantes(celluleDepart, liste) {\r\n        const listeValide = []\r\n        let cellulePrecedente = celluleDepart\r\n\r\n        for (const cellule of liste) {\r\n            const differenceLignes = cellule.numeroLigne - cellulePrecedente.numeroLigne\r\n            const differenceColonnes = cellule.numeroColonne - cellulePrecedente.numeroColonne\r\n            \r\n            if (differenceLignes > 1 || differenceLignes < -1 || differenceColonnes > 1 || differenceColonnes < -1) {\r\n                return listeValide\r\n            }\r\n            listeValide.push(cellule)\r\n            cellulePrecedente = cellule\r\n        }\r\n        return listeValide\r\n    }\r\n\r\n    ajouterCellulesRatees(cellule) {\r\n        this.supprimerCelluleJouable(cellule)\r\n        this.cellulesRatees.push(cellule)\r\n    }\r\n\r\n    ajouterCellulesTouchees(cellule) {\r\n        this.supprimerCelluleJouable(cellule)\r\n        this.cellulesTouchees.push(cellule)\r\n    }\r\n\r\n    ajouterCellulesCoulees(cellule) {\r\n        this.supprimerCelluleJouable(cellule)\r\n        this.supprimerCelluleTouchee(cellule)\r\n        this.cellulesCoulees.push(cellule)\r\n    }\r\n\r\n    supprimerCelluleJouable(cellule) {\r\n        const position = this.cellulesJouables.indexOf(cellule)\r\n        if (position != -1) {\r\n            this.cellulesJouables.splice(position, 1)\r\n        }\r\n    }\r\n\r\n    supprimerCelluleTouchee(cellule) {\r\n        const position = this.cellulesTouchees.indexOf(cellule)\r\n        if (position != -1) {\r\n            this.cellulesTouchees.splice(position, 1)\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://bataille-navale/./src/lib/IA.js?");

/***/ }),

/***/ "./src/lib/jeu.js":
/*!************************!*\
  !*** ./src/lib/jeu.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst CIBLE_RATEE = 1\r\nconst CIBLE_TOUCHEE = 2\r\nconst CIBLE_COULEE = 3\r\n\r\nconst jouerTour = (cellule, ) => {\r\n    cellule.elementHtml.innerHTML = 'X'\r\n\r\n    if (cellule.bateau) {\r\n        cellule.bateau.cellulesTouchees.push(cellule)\r\n\r\n        if (cellule.bateau.cellulesTouchees.length == cellule.bateau.cellules.length) {\r\n            cellule.bateau.cellules.forEach((celluleBateau) => {\r\n                celluleBateau.elementHtml.className = 'bateau coule'\r\n            })\r\n            return CIBLE_COULEE\r\n        } else {\r\n            cellule.elementHtml.className = 'bateau touche'\r\n            return CIBLE_TOUCHEE\r\n        }\r\n    } else {\r\n        return CIBLE_RATEE\r\n    }\r\n}\r\n\r\nconst ajouterLogActionCellule = (cellule, type, joueur) => {\r\n    let resultat\r\n    switch (type) {\r\n        case CIBLE_RATEE:\r\n            resultat = 'Cible ratée'\r\n            break;\r\n        case CIBLE_TOUCHEE:\r\n            resultat = 'Cible touchée'\r\n            break;\r\n        case CIBLE_COULEE:\r\n            resultat = 'Cible coulée'\r\n            break;\r\n    }\r\n    ajouterLog('[' + cellule.lettreColonne + cellule.numeroLigne + '] ' + resultat + '.', joueur)\r\n}\r\n\r\nconst ajouterLog = (log, joueur) => {\r\n    const $logs = document.querySelector('div#logs-' + (joueur ? 'joueur' : 'ia') + ' .logs-contenu')\r\n    const $log = document.createElement('div')\r\n    $log.innerText = log\r\n    $logs.appendChild($log)\r\n    $logs.scroll(0, $logs.children.length * 50)\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    CIBLE_RATEE,\r\n    CIBLE_TOUCHEE,\r\n    CIBLE_COULEE,\r\n    jouerTour,\r\n    ajouterLogActionCellule,\r\n    ajouterLog\r\n});\n\n//# sourceURL=webpack://bataille-navale/./src/lib/jeu.js?");

/***/ }),

/***/ "./src/lib/utile.js":
/*!**************************!*\
  !*** ./src/lib/utile.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * Envoie la lettre correspondant au nombre.\r\n */\r\nconst nombreVersLettre = (nombre) => {\r\n    const lettres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'\r\n\r\n    return lettres[nombre - 1]\r\n}\r\n\r\n/**\r\n * Envoie un nombre aléatoire compris entre la valeur min et la valeur max.\r\n */\r\nconst aleatoire = (min, max) => {\r\n\treturn Math.floor(Math.random() * (max - min + 1)) + min\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    nombreVersLettre,\r\n    aleatoire\r\n});\n\n//# sourceURL=webpack://bataille-navale/./src/lib/utile.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;