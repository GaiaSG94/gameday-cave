# PAGES — Cave

> Statuts : à dessiner / en revue / validée. Liste de départ du brief, **à valider par Gaia**.
> Chaque planche montre le cadre desktop 1440 × 900 et le cadre mobile 390 × 844 côte à côte.

| # | Page | Rôle | Contenu clé | Statut |
|---|------|------|-------------|--------|
| 1 | **Post** | Vue dans le fil (`splash.html`, inline) : donner envie d'ouvrir l'expérience du jour | En-tête du post, n° du banc du jour, râtelier de 5 flacons fermés, série du joueur, bouton d'entrée (« Descend » aujourd'hui) | **validée (V2, `planches/v2/00-post.html`)** |
| 2 | **Jeu** | Écran principal (`game.html`, vue étendue). Une seule règle : « verse chaque liquide dans un flacon, chaque note du cahier doit tenir » | 5 flacons, 5 liquides (water, wine, oil, honey, poison), notes du cahier (indices), grille de versement liquide × flacon, chrono, série, bouton « Cap the rack » (n/5) | **validée (V2, `planches/v2/01-verre-souffle.html`)** — V1 écartée |
| 3 | **Carte de fin** | Résultat + boucle quotidienne + accroche commentaire | Gagné (« Rack complete ») ou raté (« Toxic mix », on peut reverser), temps, série, invitation à commenter en un geste, prochain banc | **validée (V2, `planches/v2/02-carte-de-fin.html`)** |
| 4 | **Séries & classement** | Montrer la série et les scores de la communauté | Série perso, scores communautaires du jour | **validée (V2, `planches/v2/03-series-classement.html`)** — données de démo, **voir question 4** |

États transverses (dessinés dans la bande « États » de chaque planche, pas des pages) : chargement, flacon vide / versé / dernier versement, bouton inactif / prêt, résultat gagné / raté.

## Questions produit ouvertes (non tranchées)

1. **« Reaction clues »** (`IDEE.md`) : le générateur (`src/shared/puzzle.ts`) ne produit que des indices de **position** (« X est juste à droite de Y », « le flacon N contient X », parité, « X n'est pas dans N »). Aucune réaction chimique. Les planches affichent les indices tels qu'ils sont générés. Garde-t-on ce texte ou faut-il des indices de réaction ?
2. **Bug repéré, à transmettre au dev** : les indices de parité sont décalés d'un cran. `contentParity` teste l'index 0-based mais le texte affiche des flacons 1-based. Exemple réel : le 22/12, le texte dit « The poison sits in an odd flask » alors que le poison est dans le flacon 4. Pareil le 27/12 et le 28/12. Les planches utilisent le 14/12, qui n'a pas d'indice de parité.
3. **Difficulté** : beaucoup de jours ont 2 indices « Flask N holds X » sur 3 ou 4 indices, donc la partie se résout presque toute seule (ex. le 09/12). Décision produit, pas design, mais ça change la place du cahier à l'écran.
4. **Scores communautaires** : le serveur ne stocke aujourd'hui que la série et « résolu aujourd'hui » par joueur. Il n'y a ni temps de la communauté, ni % de réussite, ni classement. La page 4 et la partie communauté de la page 3 demandent ces données : lesquelles garde-t-on ?
5. **Aide à l'élimination** : faut-il pouvoir barrer une case de la grille (« pas ici ») sans verser, et cocher un indice quand il est satisfait ? Ce n'est pas dans `IDEE.md`, donc rien de tout ça n'est dessiné en fonctionnel. Les cases « occupées » sont seulement atténuées (02 les barre visuellement, mais c'est un affichage, pas une action).
6. **Ton du texte** : le code parle d'alchimiste, de cellier et de lampes (« Stoking the lamps… », « Descend »), alors que le brief parle de labo. Les planches gardent le texte du jeu et ajoutent « Ledger » / « Pour ». La direction 03 assume le cellier, la 01 le labo.
7. **Classement** : trié au temps (série affichée en puce), ou par série ? Et un onglet « All benches » (classement des séries) : on le garde ? Il n'est pas dans `IDEE.md`, il est seulement esquissé comme état.
8. **Commenter en un geste** : le texte proposé ne nomme aucun liquide. Il faut un endpoint serveur qui poste le commentaire au nom du joueur : à valider côté Devvit (permissions de l'app).
