// 1. Récupération des éléments HTML
const inputNombreJoueurs = document.getElementById("nombreJoueurs");
const boutonDemarrer = document.getElementById("demarrer");
const affichageAllumettes = document.getElementById("allumettesRestantes");
const affichageJoueur = document.getElementById("joueurActuel");
const inputRetrait = document.getElementById("retrait");
const boutonJouer = document.getElementById("jouer");
const affichageMessage = document.getElementById("message");
const ecranInitialisation = document.getElementById("ecranInitialisation");
const ecranJeu = document.getElementById("ecranJeu");
const messageInitialisation = document.getElementById("messageInitialisation");
const btnRejouer = document.getElementById("btn-rejouer");

// Le bouton Rejouer est masqué au démarrage.
btnRejouer.hidden = true;

// 2. Variables de la partie
const NOMBRE_INITIAL = 50;

let allumettesRestantes = NOMBRE_INITIAL;
let nombreJoueurs = 0;
let joueurActuel = 1;
let partieEnCours = false;

// Désactiver le bouton jouer au chargement
boutonJouer.disabled = true;

// 3. Vérifier si le retrait est valide
function verifierRetrait(retrait, allumettesRestantes) {
  return (
    Number.isInteger(retrait) &&
    retrait >= 1 &&
    retrait <= 6 &&
    retrait <= allumettesRestantes
  );
}

// 4. Retirer les allumettes
function retirerAllumettes(retrait, allumettesRestantes) {
  return allumettesRestantes - retrait;
}

// 5. Passer au joueur suivant
function changerJoueur(joueurActuel, nombreJoueurs) {
  return (joueurActuel % nombreJoueurs) + 1;
}

// 6. Démarrer une nouvelle partie
boutonDemarrer.addEventListener("click", function () {
  // Récupérer le nombre de joueurs
  nombreJoueurs = inputNombreJoueurs.valueAsNumber;

  // Vérifier que le nombre de joueurs est compris entre 2 et 6
  if (
    !Number.isInteger(nombreJoueurs) ||
    nombreJoueurs < 2 ||
    nombreJoueurs > 6
  ) {
    messageInitialisation.textContent = "Erreur : choisis entre 2 et 6 joueurs.";

    partieEnCours = false;
    boutonJouer.disabled = true;

    return;
  }

  // Effacer un éventuel ancien message d'erreur
  messageInitialisation.textContent = "";

  // Initialiser la nouvelle partie
  allumettesRestantes = NOMBRE_INITIAL;
  joueurActuel = 1;
  partieEnCours = true;

  // Changer d'écran
  ecranInitialisation.classList.add("cache");
  ecranJeu.classList.remove("cache");

  // Mettre à jour les affichages
  affichageAllumettes.textContent = `Prêts à faire disparaître les ${allumettesRestantes} allumettes ?`;

  affichageJoueur.textContent = `Le joueur ${joueurActuel} commence.`;

  affichageMessage.textContent = "La partie commence !";

  // Réinitialiser le champ de retrait
  inputRetrait.value = "";

  // Autoriser le jeu
  boutonJouer.disabled = false;
});

// 7. Jouer un tour
boutonJouer.addEventListener("click", function () {
  // Vérifier que la partie est en cours
  if (!partieEnCours) {
    return;
  }

  // Récupérer le nombre d'allumettes à retirer
  const retrait = inputRetrait.valueAsNumber;

  // Vérifier si le retrait est valide
  if (!verifierRetrait(retrait, allumettesRestantes)) {
    affichageMessage.textContent =
      "Retrait invalide : choisis un nombre entier entre 1 et 6, inférieur aux nombre d'allumettes restantes.";

    return;
  }

  // Mémoriser le joueur qui vient de jouer
  const joueurQuiJoue = joueurActuel;

  // Retirer les allumettes
  allumettesRestantes = retirerAllumettes(retrait, allumettesRestantes);

  // Mettre à jour le compteur
  affichageAllumettes.textContent = `Allumettes restantes : ${allumettesRestantes}`;

  // Vider le champ de saisie
  inputRetrait.value = "";

  // 8. Vérifier si le joueur a gagné
  if (allumettesRestantes === 0) {
    affichageMessage.textContent =
        `Bravo ! Le joueur ${joueurQuiJoue} a gagné !`;

    partieEnCours = false;
    boutonJouer.disabled = true;

    affichageJoueur.textContent = "Partie terminée !";

    // Afficher le bouton Rejouer
    btnRejouer.hidden = false;

    return;
}

  // 9. Passer au joueur suivant
  joueurActuel = changerJoueur(joueurActuel, nombreJoueurs);

  affichageJoueur.textContent = `Au tour du joueur ${joueurActuel}.`;

  affichageMessage.textContent = `Le joueur ${joueurQuiJoue} a retiré ${retrait} allumette(s).`;
});

btnRejouer.addEventListener("click", () => {
    // Masquer le bouton Rejouer
    btnRejouer.hidden = true;

    // Masquer l'écran de jeu
    ecranJeu.classList.add("cache");

    // Afficher l'écran d'initialisation
    ecranInitialisation.classList.remove("cache");

    // Effacer les anciens messages
    affichageMessage.textContent = "";
    affichageJoueur.textContent = "";
    messageInitialisation.textContent = "";

    // Vider le champ de retrait
    champRetrait.value = "";

    // Réactiver le bouton de jeu
    boutonJouer.disabled = false;

    // Effacer les valeurs précédentes affichées
    affichageAllumettes.textContent = "Allumettes restantes : 50";
});
