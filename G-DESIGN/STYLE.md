# STYLE — Cave (V2, validé le 2026-11-18)

> Design system du Chemistry Lab de LabKit (piste C4 « verre soufflé »), appliqué au contenu de Cave.
> Source de vérité : `G-DESIGN/_src/01-verre-souffle.src.html` (page Jeu validée). Les autres planches
> en reçoivent la CSS et le JS au build (`_src/build.py`) : on corrige le style à un seul endroit.

## Palette

| Rôle | Valeur | Usage |
|---|---|---|
| Page | `#6cc95a` | Aplat plein écran, jamais de dégradé ni de cadre sombre |
| Encre | `#0b2a17` | Texte, carré « versé », étiquette du dernier versement, bouton principal, ligne « moi » |
| Encre 60 % | `rgba(11,42,23,.6)` | Légendes, texte secondaire |
| Verre dépoli | blanc 38 %, flou 16 px, saturation 1,3, bord blanc 62 %, ombre `0 20px 40px -24px rgba(5,45,20,.6)` | Toutes les cartes et pilules (`.gx`) |
| Blanc 55 % | `rgba(255,255,255,.55)` | Lignes à l'intérieur d'une carte (indices, classement, chiffres) |
| Point d'action | `#ff5a3d` | Uniquement le point du bouton principal et l'anneau « aujourd'hui » |
| Réussi | `#16a34a` | Puce « rack complete », « comment posted » |
| Raté | `#b91c1c` | Puce « toxic mix » |
| Liquides | water `#a9dcf2` · wine `#b3264f` · oil `#e3cf5a` · honey `#f0a12e` · poison `#4a2d6b` · fermé `#e9efe6` | Couleur de la substance (flacon, point, pastilles). Toujours accompagnée du nom |
| Liège | dégradé `#d8ad7c` → `#9c6d40` | Bouchon des flacons |

## Typo

| Niveau | Style |
|---|---|
| Marque | Archivo 900, largeur 70 %, bas de casse : « cave », 30 px mobile / 34 px desktop |
| Chiffre héros | Archivo 900, largeur 66 %, chiffres tabulaires, interligne 0,9 : 64–104 px (temps de fin), 62 px (temps en jeu), 96 px (série) |
| Chiffre de carte | même style, 26–44 px |
| Titre court | Archivo 900, largeur 70 %, 26–32 px (« five flasks, no labels. ») |
| Texte | Archivo 600–700, 12,5–14 px |
| Légende | Mono 700, 9–10,5 px, capitales, interlettrage 0,08–0,1 em, encre 60 % |
| Formules | Mono 600, 9,5 px (H₂O, C₂H₅OH, C₁₈H₃₄O₂, C₆H₁₂O₆, As₂O₃) |

Archivo (OFL) est embarquée. Mono : JetBrains Mono si présente, sinon la mono du système. En production, il faudra embarquer une mono libre (CSP Devvit).

## Grille

- **Mobile 390 × 844 (vue étendue 390 × 756 utiles)** : une colonne, marges 14–16 px, espacement 8–10 px, tout tient sans défiler (vérifié par script sur chaque planche). Barre en pilule toujours en bas.
- **Desktop (vue étendue ~1000 × 764)** : trois colonnes qui ne se chevauchent jamais, `300 | auto | 236–260`, espacement 14–18 px. Colonne gauche = ce que je manipule ou ce que j'ai fait ; centre = la verrerie ; droite = chiffres et texte.
- **Vue inline (Post)** : 708 × 420 desktop, 390 × 400 mobile. Pas de carte : marque, verrerie, une phrase, un bouton.
- Bascule par container query sur la zone de la vue (`min-width: 760px`), pas par la largeur de la fenêtre.

## Composants

- **Carte** `.gx` : rayon 22 (18 pour les mini-cartes), padding 12–16, légende `.cap-t` en haut (titre à gauche, précision à droite).
- **Pilule** : hauteur 34 (mobile) / 46 (desktop), verre dépoli. Puce numérique encre à l'intérieur (`streak 5`).
- **Flacon** : flacon à réactif en verre soufflé (reflet blanc à gauche, ombre au sol), bouchon de liège, liquide coloré avec ménisque clair et 3 bulles. États : vide (pas de liquide), versé, dernier versement (étiquette encre), fermé (liquide laiteux, « ? »).
- **Étiquette de flacon** : pilule sous le flacon, « NO.n » en mono et le nom ; vide = pointillés.
- **Ligne de substance** : point de couleur, nom + formule, 5 carrés 32 × 30–34 (rayon 9, bord encre 30 %). Versé = carré encre ; occupé = 30 % d'opacité.
- **Ligne de liste** (indice, classement) : blanc 55 %, rayon 12, numéro mono à gauche ; « moi » = fond encre.
- **Bouton principal** : pilule encre 42–46 px, point `#ff5a3d` à gauche, compteur mono à droite (`3/5`). Inactif : encre 18 %, point grisé.
- **Bouton secondaire** : pilule transparente, bord encre 1,5 px.
- **Onglets** : pilule de verre, onglet actif encre (`Today | All benches`).
- **Puce d'état** : 11 px, blanc sur `#16a34a` / `#b91c1c`.
- **Calendrier / semaine** : points ronds ; encre = résolu, anneau `#ff5a3d` = aujourd'hui, contour = raté, pointillés = à venir, 8 % = avant le lancement.

## Mouvement (pour le dev, non montré sur planche statique)

- Verser : le liquide monte de 0 au niveau en 280 ms (ease-out), le ménisque arrive en dernier ; l'étiquette passe à l'encre.
- Déplacer un liquide (re-verser) : l'ancien flacon se vide en 180 ms avant que le nouveau se remplisse.
- « Cap the rack » gagnant : les bouchons descendent de 2 px l'un après l'autre (60 ms d'écart), puis la carte de fin glisse de 12 px en fondu (220 ms).
- « Toxic mix » : le râtelier tremble 2 fois (±3 px, 240 ms), la puce rouge apparaît. Aucun son obligatoire.
- Chargement : trois bulles qui montent en boucle.
- `prefers-reduced-motion` : aucun mouvement, changements instantanés (comme LabKit).

## Règles d'états

- Un seul élément encre « actif » à la fois par zone : le dernier versement, la ligne « moi », l'onglet courant.
- Le point `#ff5a3d` ne sert qu'à l'action principale et à « aujourd'hui ». Jamais en texte, jamais en fond.
- Le rouge `#b91c1c` n'apparaît qu'en cas de raté ; le vert `#16a34a` qu'en cas de réussite.
- Un liquide n'est jamais montré seulement par sa couleur : toujours avec son nom (étiquette, ligne ou indice).
- Avant d'avoir résolu le banc, aucune vue ne révèle la solution (Post = flacons fermés).
- Pas d'emoji, pas de mascotte, pas de karma, pas d'élément de marque Reddit.
