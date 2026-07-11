# India Beau Village — notes de refonte
Relevé et construction : 11 juillet 2026. Canonique retenu : **https://indiabeauvillage.com**.

## 1. Ce qui clochait (constaté en direct, juillet 2026)

Le site actuel indiabeauvillage.com est un « one-pager » DIY figé depuis ~2018. Constaté lors du relevé : le texte gabarit **« My Anchor » affiché quatre fois** en pleine page; la ligne **« WE ALSO SERVE with HUBER, SKIP the DISHES and DOORDASH »** (HUBER pour Uber); une page nommée **« Menue »**; des photos de banque d'images intitulées **« Grilled Meat », « Special Skewer », « Premium Chicken »** — des brochettes et du steak qui ne représentent pas une cuisine indienne halal; un **code postal erroné (H3N 1G6)**; et une navigation par ancres sans vraies pages. En parallèle, deux autres demi-sites vivent leur vie : le système de commande DI Develop (indiabeauvillagemontreal.com) et la vitrine RestoMontreal (restoindiabeauvillage.ca), chacun avec ses propres heures et son propre texte. Trois demi-sites, aucune adresse web dont le restaurant soit propriétaire de bout en bout.

## 2. Faits vérifiés et divergences entre sources

| Donnée | Valeur retenue | Source | Divergence relevée |
|---|---|---|---|
| Adresse | 640, rue Jarry O, Montréal (Parc-Extension) QC **H3N 1G2** | Uber Eats + DI Develop /location + brief | Ancien site et RestoMontreal affichent **H3N 1G6** — à corriger partout |
| Téléphone | +1 514 272-5847 | Toutes sources concordent | — |
| Heures | **7 jours, 11 h à minuit** | Fiche Google (brief, vérifié) | RestoMontreal affiche 11 h–23 h; la commande en ligne ferme ~22 h 20. Le site affiche les heures Google + note « la commande en ligne ferme plus tôt » |
| Avis Google | **3,9 ★ · 2 228 avis** | Brief (vérifié juillet 2026) | Uber : 4,4 (2 000+); Skip : 9,2/10; RestoMontreal : 580 avis. Le badge du site cite Google avec attribution |
| Place ID Google | `ChIJ2wLiqgYZyUwRs9xaQzEEtgk` | restoindiabeauvillage.ca (liens avis) | Alimente le lien « Laisser un avis » du pied de page et le lien Itinéraire |
| Nom sur Uber Eats | « **Indian** Beau Village » | ubereats.com | Coquille dans le nom de la fiche — à faire corriger par le marchand |
| Halal / végétarien | Oui / oui | RestoMontreal (« Indienne – Halal – Végétarienne ») | — |
| Salle | 100 places, grande salle pour fêtes, traiteur | RestoMontreal | — |
| Métro | Acadie | Ancien site (repris) | — |

### La vérification du « 59 » (le TODO-VERIFY du brief)
Le texte historique disait « fifteen lamb, nineteen chicken, nine seafood and sixteen vegetarian » (EN) mais « **quatorze** plats d'agneau » (FR) — les deux versions se contredisaient. Comptage du menu de commande en ligne réel (SkipTheDishes, juillet 2026, 107 articles) :

- **Agneau : 15** plats (les plats d'agneau de la section Non végétarien) ✓ conforme à la version EN
- **Poulet : 20** (la section Poulet complète) — le texte disait 19; un plat s'est ajouté au fil des ans
- **Fruits de mer : 9** (6 crevettes + 3 poissons) ✓ conforme
- **Végétarien : 15** (9 en Végétarien + 6 en Sucrée et épices) — le texte disait 16

**Total : 15 + 20 + 9 + 15 = 59.** Le chiffre-titre du brief tient tel quel — seule la répartition a bougé. Le site affiche les chiffres vérifiés d'aujourd'hui, et les compteurs du « grand tableau » sont **calculés à partir des données du menu**, donc ils resteront justes si le menu change. La mention historique « tous sous dix dollars » a été retirée : elle n'est plus vraie (la plupart des plats principaux sont à 10,99 $–13,99 $ en ligne).

### Prix — à confirmer avant lancement
Les 107 prix proviennent de la commande en ligne (relevé juillet 2026). Le propre canal du restaurant (DI Develop) affichait des prix plus bas sur certains articles (naan d'ail 1,99 $ vs 2,50 $; saag paneer 10,99 $ vs 12,99 $) — probables majorations de plateforme. Le tableau porte la mention « prix commande en ligne; les prix en salle peuvent différer ». **Étape 1 du lancement : obtenir la liste de prix en salle du propriétaire et mettre à jour `assets/menu-data.js` (un seul fichier).**

## 3. Le site livré

**Bilingue** — français à la racine, anglais sous `/en/` (sélecteur FR/EN dans l'en-tête, `hreflang` fr-CA/en-CA/x-default sur chaque page et dans le sitemap; un seul moteur `site.js` rend tableau, tuiles, prix, descriptions et JSON-LD dans la langue de la page, depuis le même `menu-data.js` où chaque description existe en FR et en EN). Quatre pages par langue, structure calquée sur amritpalace.com : **Accueil · Menu · À propos · Contact**, en-tête avec « **Commander** » (sélecteur Uber Eats / SkipTheDishes / DoorDash) + bouton d'appel, pied de page avec **lien profond « Laisser un avis Google »**.

- **Accueil** — héros « 59 plats, un village », sourcils « halal · végétarien » et « jarry ouest · métro acadie », badge 3,9 ★ / 2 228 avis (ici, le volume est la preuve), ruban « Ouvert 7 jours, 11 h à minuit », tuiles-compteurs 15/20/9/15 (liens profonds vers le tableau filtré), puis les **huit plats signature en texte** (nom + prix + une ligne — le motif Amrit exactement).
- **Menu** — **« Le grand tableau »** : les 107 articles sur une seule page typographiée (guides pointillés, prix en mono), quatre grandes tuiles-filtres dont les chiffres sont comptés depuis les données, pastilles par section, recherche, légende (V = végétarien, cuisine halal), JSON-LD `Menu` généré des mêmes données, et une feuille d'impression qui en fait un vrai menu papier.
- **À propos** — l'histoire de la cuisine de volume, le compte vérifié, salle de 100 places / groupes / traiteur, bloc avis.
- **Contact** — NAP exact (H3N 1G2), tableau d'heures, métro Acadie, itinéraire Google Maps (avec Place ID), livraison.

**Direction visuelle** (le brief, exécuté) : vert feuille de cari profond `#16301F`, curcuma `#E3A81C` (+ `#8F6607` pour les petits textes, contraste AA sur crème), blanc cassé `#F6F1E4`, encre `#191612`. Titres **Bricolage Grotesque** (l'enseigne fière), texte **Schibsted Grotesk**, prix et compteurs **Spline Sans Mono** (le registre « ardoise des prix » — l'honnêteté du tableau). Aucune photo de banque d'images : tout le visuel de l'ancien site est écarté et remplacé par les **vraies photos du restaurant** — sa galerie officielle (séance du 5 décembre 2024, 20 clichés hébergés par sa fiche RestoMontreal sur portal.restodata.ca). Le site en utilise neuf : deux sur À propos, la bannière sur Contact, six dans la galerie « La maison, en photos » de l'accueil, plus l'image de partage (og:image) et le champ `image` du JSON-LD. Les légendes restent factuelles (« photo maison, décembre 2024 ») sans prétendre identifier chaque plat — le propriétaire pourra les préciser en un instant. Elles sont servies en lien direct pour que le site soit complet dès aujourd'hui; `tools/localize-photos.sh` les rapatrie dans `assets/img/` avant production. Accessibilité : focus visibles, `prefers-reduced-motion` respecté (le ruban devient statique), sémantique complète, contrastes vérifiés.

## 4. Plan 301 — trois demi-sites deviennent un

Livré en quatre formats dans `redirects/` : `_redirects` (Netlify/Cloudflare Pages), `htaccess.txt` (Apache), `nginx-redirects.conf`, `vercel.json`. Cartographie :

| Ancienne URL | Destination | Pourquoi |
|---|---|---|
| indiabeauvillagemontreal.com/ | / | Accueil vers accueil |
| …/menu/, …/c/* et fiches produits à la racine | /menu.html | Toute l'équité « menu » converge vers le tableau |
| …/location/ | /contact.html | Équivalent direct |
| …/reviews/ | /a-propos.html | Bloc avis |
| …/cart, /login, /registration, CGU, confidentialité | / | Pages utilitaires sans équivalent |
| restoindiabeauvillage.ca/* | / | Vitrine une-page → accueil |
| indiabeauvillage.com/Menue (et /menue) | /menu.html | Le chemin hérité, coquille comprise |
| indiabeauvillage.com/franquias/* | / | Résidus de l'ancien CMS |
| www.* et http:// | https://indiabeauvillage.com/… | Canonicalisation |

**Décision à prendre avant d'activer les 301 de indiabeauvillagemontreal.com** : c'est le système de commande directe du restaurant (zéro commission de plateforme). Deux options honnêtes :
- **A. Garder la commande directe** — ne pas rediriger ce domaine; ajouter plutôt « Commander direct » comme 4ᵉ option du sélecteur. Meilleure marge, mais on garde deux domaines.
- **B. Consolider (les fichiers livrés)** — activer les 301 et s'appuyer sur les plateformes. Un seul domaine, mais chaque commande paie une commission.
Les fichiers livrés exécutent l'option B, telle que demandée; si le propriétaire choisit A, on retire simplement le bloc de ce domaine et on ajoute la 4ᵉ option au menu déroulant (une ligne dans chaque page).

À noter : restoindiabeauvillage.ca est hébergé par RestoMontreal — pour rediriger, il faut d'abord **pointer le DNS du domaine vers le nouvel hébergement** (ou demander à RestoMontreal de désactiver la vitrine). Le profil restomontreal.ca lui-même (annuaire) reste : y mettre à jour le lien du site.

## 5. Liste de lancement

1. **Prix** : faire confirmer les prix en salle par le propriétaire; mettre à jour `assets/menu-data.js`.
2. **Photos** : exécuter `./tools/localize-photos.sh` (machine connectée) pour auto-héberger les photos de la galerie officielle, puis faire valider le choix et les légendes par le propriétaire — il peut aussi fournir des clichés plus récents via sa fiche Google Business.
3. **DNS** : pointer les trois domaines vers l'hébergement; activer HTTPS pour chacun (les 301 en dépendent).
4. **Redirections** : déployer le fichier du format correspondant à l'hébergeur; tester une URL de chaque ligne du tableau ci-dessus.
5. **Search Console** : valider les trois propriétés; lancer « Changement d'adresse » pour les deux domaines secondaires; soumettre `sitemap.xml`.
6. **Fiche Google Business** : remplacer l'URL du site par https://indiabeauvillage.com; vérifier heures (11 h–minuit) et code postal (H3N 1G2).
7. **Fiches externes** : corriger « Indian Beau Village » → « India Beau Village » chez Uber Eats (via le support marchand); mettre à jour le lien site chez RestoMontreal, TripAdvisor, etc., et le code postal H3N 1G6 → H3N 1G2 où il traîne. Faire corriger aussi la fiche Pages Jaunes périmée « Indian Beau Village, 6925 av. du Parc, 514 490-0786 » (ancienne adresse/numéro) qui pointe vers indiabeauvillage.ca et brouille le NAP.
8. **Surveillance** : garder les 301 au moins 12 mois; surveiller les 404 dans Search Console le premier mois.
9. ~~Phase 2 : version EN~~ **Fait** — les huit pages (FR + EN) sont livrées avec `hreflang` et sélecteur de langue; le sitemap déclare les alternances.

## 6. Score de maturité web (grille interne, avant refonte)

Copy Language 6/20 (My Anchor, HUBER) · Visual Quality 4/20 (banque d'images hors-sujet) · Business Maturity 15/20 (2 228 avis, volume réel, 100 places) · Site Sophistication 3/20 (one-pager figé) · Brand Intentionality 5/20 → **33/100, palier « Standard »**. Le paradoxe qui justifie la refonte : une entreprise de palier « mature » servie par un web de palier plancher. La refonte vise le palier « Professional » : structure multi-pages, données vérifiées, un élément signature (le grand tableau) et rien d'autre qui crie.

## 7. Arborescence livrée

```
india-beau-village/                     (racine du dépôt = racine du site, prêt pour GitHub Pages)
├── index.html · menu.html · a-propos.html · contact.html   (FR)
├── en/index.html · en/menu.html · en/about.html · en/contact.html   (EN)
│                             Accueil (héros 59, signature ×8, ruban, galerie photos)
├── robots.txt · sitemap.xml · README.md
├── assets/
│   ├── styles.css            Jetons (feuille de cari/curcuma/crème/encre) + styles photos
│   ├── site.js               Sélecteur Commander, tableau, filtres, JSON-LD
│   └── menu-data.js          LA source de vérité : 107 articles FR/EN + prix
├── redirects/                _redirects · htaccess.txt · nginx · vercel.json
├── tools/localize-photos.sh  Rapatrier les photos en local avant production
├── prospects/india-beau-village/profile.json
└── REBUILD-NOTES.md          (ce document)
```
