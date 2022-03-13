/**
 * Envoie la lettre correspondant au nombre.
 */
const nombreVersLettre = (nombre) => {
    const lettres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    return lettres[nombre - 1]
}

/**
 * Envoie un nombre aléatoire compris entre la valeur min et la valeur max.
 */
const aleatoire = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
    nombreVersLettre,
    aleatoire
}