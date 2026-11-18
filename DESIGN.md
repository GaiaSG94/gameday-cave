# DESIGN — Cave (gameday-cave)

> Journal de design. Versions datées, jamais écrasées. Tenu par Claude (prompt design, `PROMPT-DESIGN.md`).
> Livrables : `G-DESIGN/` (PAGES, REFS, STYLE, planches).

## V2.1 — 2026-11-18 — déclinaison du style validé sur les 3 autres pages

**Statut** : style V2 validé par Gaia sur la page Jeu (« Approved, roll out »). Les 3 nouvelles planches sont en revue. Le style n'est pas verrouillé (`/lock` seulement quand toutes les pages seront validées).

### Livré
- `G-DESIGN/STYLE.md` : palette, typo, grille, composants, mouvement, règles d'états.
- `G-DESIGN/planches/v2/00-post.html` : vue inline dans le fil (desktop 708 × 420, mobile 390 × 400). Flacons fermés au liquide laiteux, « five flasks, no labels. », bouton « Descend ». États : déjà résolu, premier passage.
- `G-DESIGN/planches/v2/02-carte-de-fin.html` : temps 01:47 en héros, série 6 avec la semaine, flacons étiquetés (la solution), chiffres du jour, commentaire prêt sans spoiler, « Comment my time ». États : toxic mix (reste sur le Jeu), commentaire posté, bouton après envoi.
- `G-DESIGN/planches/v2/03-series-classement.html` : ma série (96 px) avec le calendrier de décembre, top 5 du banc + ma ligne, chiffres du jour, histogramme des temps (desktop). États : ma ligne, légende du calendrier, onglet « All benches ».
- `_src/build.py` : la CSS et le JS de la page Jeu validée sont injectés dans les autres planches. Un seul endroit à corriger, aucune dérive.

### Décisions
- Flacon « fermé » (`sealed`, `#e9efe6`, étiquette « ? ») ajouté au composant partagé : la vue inline ne révèle jamais la solution.
- La carte de fin ne montre que la réussite. Un raté n'est pas une fin, puisque le jeu actuel permet de reverser.
- Histogramme des temps sur desktop seulement : sur mobile, la page doit tenir sans défiler.
- Données communautaires (chimistes, % de réussite, médiane, classement, pseudos) = démo, signalées sur chaque planche (PAGES, questions 4, 7 et 8).

### Changelog V2.1
- Classement, mobile : l'histogramme s'affichait malgré `display:none` (spécificité CSS) → corrigé.
- Classement, desktop : le calendrier avait 9 colonnes, parce que la classe `today` du 14/12 entrait en collision avec la zone de grille `today` → renommée `now`.
- Vérifié par script : 4 planches, desktop + mobile + états, 0 débordement, 0 texte coupé, police Archivo chargée.

## V2 — 2026-11-18 — page « Jeu » dans le design LabKit / Chemistry Lab

**Statut** : validée par Gaia le 2026-11-18. Remplace la V1 (les 3 directions V1 sont écartées par Gaia).

### Demande
« Reprendre le design de LabKit du Chemistry Lab, mais pas son contenu. »

### Livré
- `G-DESIGN/planches/v2/01-verre-souffle.html` : page « Jeu », desktop 1440 × 900 + mobile 390 × 844, avec une bande d'états (flacon vide / versé / dernier versement, carrés, bouton inactif / prêt, résultat gagné / raté, chargement).
- `G-DESIGN/_src/01-verre-souffle.src.html` + `build.py` : source de la planche. `build.py` y inline Archivo (`_src/fonts/archivo.woff2`, OFL) pour qu'elle s'ouvre sans réseau.
- `G-DESIGN/REFS.md` : section LabKit (ce qui est repris, ce qui ne l'est pas).

### Décisions
- Design system repris tel quel : vert `#6cc95a`, encre `#0b2a17`, verre dépoli, pilules, Archivo condensé, légendes en mono, point `#ff5a3d` sur le bouton principal, verrerie soufflée sur le vert, desktop en 3 colonnes (liquides | paillasse | temps, versés, cahier).
- Contenu propre à Cave : marque « cave » avec un pictogramme flacon bouché (pas de fantôme), 5 flacons bouchés de liège, 5 liquides colorés (water `#a9dcf2`, wine `#b3264f`, oil `#e3cf5a`, honey `#f0a12e`, poison `#4a2d6b`), cahier de 4 indices, carrés 1–5 par liquide pour verser.
- Couleur d'un liquide = couleur de la substance, comme dans LabKit. Les liquides se distinguent aussi par la luminosité et par le nom écrit partout, donc pas seulement par la teinte.
- Mobile : une colonne qui tient dans 756 px utiles (vérifié par script : 0 débordement, 0 texte coupé, 16 px sous la barre).
- Mêmes données de démo que la V1 : `generateCave('2026-12-14')`, 3/5 versés.

### Changelog V2
- Flacons coupés à droite sur desktop → colonnes 300 / auto / 236 et flacons de 62 px.
- Noms des liquides qui chevauchaient les carrés → colonne des liquides élargie, carrés de 32 px.
- Texte d'état tronqué dans la barre → « Honey into flask 4 ».

## V1 — 2026-11-18 — exploration du style sur la page « Jeu » (écartée)

**Statut** : en attente de validation par Gaia (étape B du process). Rien n'est verrouillé.

### Livré
- `G-DESIGN/PAGES.md` : 4 pages proposées (Post, Jeu, Carte de fin, Séries & classement), plus 6 questions produit ouvertes.
- `G-DESIGN/REFS.md` : lecture de Noon et d'Igloo. Noon a changé (fond clair, plus sombre). Igloo ne s'est pas affiché (3D en erreur).
- `G-DESIGN/planches/v1/01-paillasse.html` : labo nocturne, verre cyan comme seul accent, flacons au trait, liquides reconnus à leur trame.
- `G-DESIGN/planches/v1/02-cahier.html` : carnet de manip sur papier quadrillé, encre bleue comme seul accent, croquis à la plume, étiquettes de travers. **Direction qui s'écarte** du fond sombre du brief.
- `G-DESIGN/planches/v1/03-cellier.html` : « cave » au sens de cellier, pénombre chaude, lampe ambre derrière l'étagère, ballons à fond rond, étiquettes kraft.

### Décisions communes aux 3 planches
- **Vraies données** : partie générée par `generateCave('2026-12-14')` (4 indices, solution wine · water · oil · honey · poison), montrée en cours de partie : 3/5 versés, le miel vient d'être versé dans le flacon 4.
- **Interaction inchangée** : une grille liquide × flacon (le comportement actuel de `pour()` : toucher une case verse, et re-verser déplace). Les colonnes de la grille sont alignées sous les flacons.
- **Liquides reconnus sans couleur** : trame + nom + formule mono (H₂O, C₂H₅OH, C₁₈H₃₄O₂, C₆H₁₂O₆, As₂O₃). Pas d'emoji (le jeu actuel en utilise, à retirer).
- **Un seul accent par direction**, réservé au dernier geste et au bouton final. L'alerte n'est qu'un état (« Toxic mix »).
- **Cadres** : desktop = vue étendue en modale sur un fil générique sans marque ; mobile = vue étendue plein écran. Vérifié par script : rien ne déborde des 844 px en mobile (26 px de marge sous le bouton) sur les 3 planches.
- Planches autonomes : un seul fichier HTML, CSS et JS inline, aucune ressource réseau, ouverture par double-clic.

### Changelog V1
- Flacon d'abord dessiné comme une bouteille (lu comme « bouteille de vin », donc clipart) → remplacé par un flacon à réactif à col large (01, 02) et un ballon à fond rond (03).
- Mobile trop haut (01 : +21 px, 02 : +63 px) → espacements, flacons (96 px) et cases (32 px) resserrés.
