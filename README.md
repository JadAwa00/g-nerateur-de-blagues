# TP 02 - Requêter une API distante avec Fetch

Petite application web qui affiche des blagues en français récupérées depuis une API distante, et les empile dans un tableau.

## Fonctionnalités

- Bouton **Afficher une blague** : appelle l'API et ajoute la blague dans le tableau
- Bouton **Retirer** sur chaque ligne : supprime uniquement cette blague
- Bouton **Vider le tableau** : supprime toutes les lignes d'un coup
- Le bouton est désactivé pendant la requête pour éviter les doubles clics

## API utilisée

[JokeAPI](https://jokeapi.dev/) — endpoint `https://v2.jokeapi.dev/joke/Any?lang=fr&safe-mode&blacklistFlags=nsfw,religious,political,racist,sexist,explicit`

Paramètres passés dans l'URL :

| Paramètre | Rôle |
|---|---|
| `lang=fr` | blagues en français |
| `safe-mode` | active les filtres de sécurité de l'API |
| `blacklistFlags=nsfw,religious,political,racist,sexist,explicit` | exclut les sujets sensibles |

L'API renvoie deux formats de blague :

- `type: "single"` → le texte est dans `joke`
- `type: "twopart"` → question dans `setup`, chute dans `delivery`

Le script gère les deux cas.

## Librairie CSS : Bulma

J'ai choisi [Bulma](https://bulma.io/) (v1.0.2, via CDN) pour ce TP :

- c'est du CSS pur, sans JavaScript ni dépendance à installer
- les classes sont lisibles et explicites (`button is-primary`, `table is-striped`), ce qui garde le HTML clair
- le tableau et les boutons sont stylés correctement sans écrire une seule ligne de CSS

## Structure du projet

```
TP_API/
├── index.html      Structure de la page (formulaire + tableau)
├── js/
│   └── script.js   Appel de l'API et manipulation du DOM
└── README.md
```

## Lancer le projet

Ouvrir `index.html` dans un navigateur. Aucune installation nécessaire, l'API est publique et ne demande pas de clé.

## Gestion des erreurs

- Si l'API renvoie une erreur (`donnees.error`), un avertissement est affiché dans la console
- Si la requête échoue (pas de connexion par exemple), une alerte prévient l'utilisateur et l'erreur est loggée