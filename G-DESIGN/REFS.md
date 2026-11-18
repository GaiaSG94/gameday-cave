# REFS — Cave

> **V2 (2026-11-18)** : sur demande de Gaia, le style vient du Chemistry Lab de LabKit (voir la section en bas). Noon et Igloo, analysés pour la V1, ne pilotent plus la direction.

> Principes seulement (palette, échelle typo, densité, mouvement, lumière). Jamais un layout, un texte, un asset ou une marque.
> Les deux références ont été ouvertes le 2026-11-18 dans le navigateur intégré.

## Noon — noon.ai

**Ce que j'ai vu (le 18/11/2026)** : le site n'est **plus** sur fond sombre, contrairement à ce que dit le brief. Fond clair chaud (blanc cassé crème), un seul accent orange (boutons, barres de score), et des « instruments » sombres posés sur la page : des panneaux de données à coins arrondis. Aucune vidéo visible en haut de page.

**Ce que j'en retiens** :
- **Un seul accent**, réservé à l'action et à la donnée qui compte (CTA, barre de score). Tout le reste est neutre.
- **Compteurs en mono, petites capitales, séparés par des points** (« N screened · N scored · N strong ») : une ligne d'état dense et lisible. → l'en-tête des sections (« LEDGER · 4 NOTES », « POUR · TAP A CELL »).
- **Chiffres tabulaires** courts et alignés à droite. → chrono, n° de flacon, n/5.
- **Panneau d'instrument posé sur un fond calme** : contraste de surface plutôt que de couleur. → le cahier d'indices dans 01 et 02.
- Sections numérotées « 01 », « 02 ». → numérotation des notes du cahier.

## Igloo — igloo.inc

**Ce que j'ai vu (le 18/11/2026)** : la scène 3D **n'a pas pu s'afficher** dans le navigateur intégré (erreur JavaScript `RangeError: Maximum call stack size exceeded` dans le bundle 3D). Seul l'écran de chargement est apparu : un champ gris bleuté uni, avec au centre un minuscule indicateur de progression fait de glyphes mono.

**Ce que j'en retiens, et seulement ça** :
- **Le chargement comme objet minimal** : un champ uni et un seul signe qui bouge. → état « Stoking the lamps… » (un trait lumineux dans 01, un point de lampe dans 03).
- La promesse du brief (« matière réaliste, lumière qui structure l'écran ») **n'a pas été vérifiée de mes yeux** : la direction 03 l'applique comme intention du brief, pas comme observation. **À revoir** dans un navigateur avec WebGL avant de verrouiller le style, ou à remplacer par une autre référence.

## Ce qu'aucune planche ne reprend

Aucun texte, logo, police, illustration ni mise en page de ces sites. Les polices des planches sont des piles système (Inter / Helvetica / Ubuntu Sans, JetBrains Mono / Ubuntu Sans Mono, Iowan / Charter / Noto Serif pour 02). La production embarquera ses propres fontes sous licence libre (CSP Devvit : aucune requête externe).

## LabKit — Chemistry Lab (V2, référence imposée par Gaia)

**Sources ouvertes le 18/11/2026** : dépôt `GaiaSG94/LabKit` (`.kiro/steering/design-system.md`, `engines/chimie/hud-css.js`), labo en ligne `gaiasg94.github.io/LabKit/app-chimie/` (desktop 1440 × 900 et mobile 375), planche `auralab-planches-chimie.html` (piste C4 « verre soufflé », celle qui est en production).

**Repris (le design)** :
- Page en aplat vert `#6cc95a`, sans cadre sombre ; texte encre `#0b2a17`.
- Panneaux en verre dépoli : blanc 38 %, flou 16 px, saturation 1,3, bord blanc 62 %, rayon 22, ombre verte portée ; pilules pour les puces et la barre du bas.
- Archivo condensé 900 en bas de casse pour la marque (« cave »), mêmes chiffres condensés géants pour les mesures (le temps) ; mono 10,5 px en capitales pour les légendes de carte.
- Lignes de substance « point de couleur + nom + carrés » (ici : liquide + 5 flacons) ; carré encre = choisi.
- Bouton principal encre avec point `#ff5a3d` ; puces d'état vert `#16a34a` / rouge `#b91c1c`.
- Verrerie « soufflée » posée directement sur le vert, avec reflets blancs, ombre au sol et liquide coloré par la substance.
- Desktop en trois colonnes qui ne se chevauchent jamais, barre centrale en bas.

**Pas repris (le contenu)** : le fantôme-fiole (logo et guide), le nom « chemistry lab », les onglets Lab / Laws / Knobs / Notebook, les instruments (thermomètre, pH-mètre, manomètre…), le matériel (burette, bec Bunsen, trépied), les lois, l'échelle de pH, le bouton Measure, les flacons compte-gouttes. Cave garde ses 5 flacons bouchés de liège, ses 5 liquides, son cahier d'indices et sa grille.

**Écart assumé** : le Chemistry Lab ne tient pas en 390 px de large (les panneaux se recouvrent). Le mobile de Cave est donc une adaptation : une colonne empilée qui tient sans défiler, avec les étiquettes sous les flacons au lieu de traits de rappel.

**Police** : Archivo (OFL) est embarquée en base64 dans la planche, à partir du fichier de la vidéo LabKit. JetBrains Mono n'est pas disponible en local : la planche utilise la mono du système à la place (Ubuntu Sans Mono ici).

**Aurakit / jsplus** : aucun dépôt ou dossier de ce nom trouvé (ni en local ni sur GitHub GaiaSG94). Les seules planches « aura » trouvées sont les `auralab-*.html` de LabKit, utilisées ci-dessus.
