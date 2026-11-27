// ============================================================
// TP 02 - API : requêter l'API JokeAPI avec Fetch
// ============================================================

// URL de l'API (voir https://jokeapi.dev/)
// - lang=fr : pour avoir les blagues en FRANÇAIS (obligatoire)
// - safe-mode : active tous les filtres de sécurité
// - blacklistFlags : filtre les sujets sensibles (sexe, religion, politique, etc.)
const URL_API = "https://v2.jokeapi.dev/joke/Any?lang=fr&safe-mode&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

// Récupération des éléments du DOM
const formulaire = document.getElementById("formulaire");
const corpsTableau = document.getElementById("corps-tableau");
const boutonVider = document.getElementById("bouton-vider");
const boutonBlague = document.getElementById("bouton-blague");

// ------------------------------------------------------------
// Appelle l'API et ajoute la blague dans le tableau
// ------------------------------------------------------------
function recupererUneBlague() {
    // Requête GET vers l'API avec Fetch
    return fetch(URL_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (donnees) {
            // Affichage dans la console pour vérification
            console.log(donnees);
            // Vérification si l'API a retourné une erreur
            if (donnees.error) {
                console.warn("Aucune blague trouvée ou erreur API :", donnees.message);
                return false;
            }
            // La blague est directement ajoutée au tableau
            ajouterBlague(donnees);
            return true;
        })
        .catch(function (error) {
            console.error("Erreur lors de l'appel à l'API :", error);
            alert("Impossible de récupérer la blague. Vérifiez votre connexion internet.");
            return false;
        });
}

// ------------------------------------------------------------
// Événement : soumission du formulaire
// ------------------------------------------------------------
formulaire.addEventListener("submit", function (event) {
    event.preventDefault();
    // Désactive le bouton pendant la requête
    boutonBlague.disabled = true;
    // Appel de la fonction pour récupérer et afficher la blague
    recupererUneBlague()
        .finally(function () {
            // Réactivation du bouton une fois la requête terminée
            boutonBlague.disabled = false;
        });
});
// ------------------------------------------------------------
// Ajoute une blague dans le tableau
// ------------------------------------------------------------
function ajouterBlague(donnees) {
    // Création d'une nouvelle ligne <tr>
    const ligne = document.createElement("tr");
    // Colonne 1 : Catégorie
    const celluleCategorie = document.createElement("td");
    celluleCategorie.textContent = donnees.category;
    ligne.appendChild(celluleCategorie);
    // Colonne 2 : Texte de la blague
    const celluleBlague = document.createElement("td");
    if (donnees.type === "twopart") {
        // Blague en deux parties : question puis réponse
        celluleBlague.textContent = donnees.setup + " " + donnees.delivery;
    } else {
        // Blague simple en une seule ligne
        celluleBlague.textContent = donnees.joke;
    }
    ligne.appendChild(celluleBlague);
    // Colonne 3 : Bouton pour retirer la ligne
    const celluleAction = document.createElement("td");
    const boutonRetirer = document.createElement("button");
    boutonRetirer.type = "button";
    boutonRetirer.className = "button is-small is-warning";
    boutonRetirer.textContent = "Retirer";
    boutonRetirer.addEventListener("click", function () {
        ligne.remove();
    });
    celluleAction.appendChild(boutonRetirer);
    ligne.appendChild(celluleAction);
    // Ajout de la ligne au tableau
    corpsTableau.appendChild(ligne);
}

// ------------------------------------------------------------
// Événement : vider entièrement le tableau
// ------------------------------------------------------------
boutonVider.addEventListener("click", function () {
    corpsTableau.innerHTML = "";
});
