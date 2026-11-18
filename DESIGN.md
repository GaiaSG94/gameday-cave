# DESIGN — Cave (gameday-cave)

> Journal de design. Versions datées, jamais écrasées. Tenu par Claude (prompt design, `PROMPT-DESIGN.md`).
> Livrables : `G-DESIGN/` (PAGES, REFS, STYLE, planches).

## V1 — 2026-11-18 — exploration du style sur la page « Jeu »

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
