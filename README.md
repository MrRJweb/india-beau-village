# India Beau Village — refonte du site

Refonte complète de **indiabeauvillage.com** (restaurant indien halal & végétarien, 640 rue Jarry O, Montréal — Parc-Extension). Site statique, sans dépendances : HTML + CSS + JS, prêt à héberger n'importe où. **Bilingue** : français à la racine, anglais sous `/en/`, avec sélecteur FR/EN dans l'en-tête et balises `hreflang` sur chaque page.

**Données vérifiées (juillet 2026)** : menu complet de 107 articles relevé sur la commande en ligne, le compte-titre **59 plats principaux** (15 agneau · 20 poulet · 9 mer · 15 végé) recompté plat par plat, coordonnées et heures croisées entre Google, Uber Eats et les fiches existantes. Détails, divergences et sources : voir `REBUILD-NOTES.md`.

## Aperçu local

Aucun build. Ouvrir `index.html` dans un navigateur, ou :

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Publier avec GitHub Pages

1. Créer un dépôt et pousser le contenu de ce dossier tel quel (les pages sont à la racine).
2. **Settings → Pages → Source : Deploy from a branch → `main` / `/ (root)`**.
3. Le site est en ligne sur `https://<compte>.github.io/<dépôt>/` en une minute.
4. Pour le domaine final, ajouter `indiabeauvillage.com` comme domaine personnalisé (ou déployer sur Netlify/Vercel — les règles 301 sont fournies dans `redirects/`).

## Structure

```
index.html · menu.html · a-propos.html · contact.html   les 4 pages (FR)
en/  index.html · menu.html · about.html · contact.html  les 4 pages (EN)
assets/styles.css                                        jetons de design (feuille de cari / curcuma / crème / encre)
assets/menu-data.js                                      LA source de vérité : 107 articles FR/EN + prix + descriptions bilingues
assets/site.js                                           tableau filtrable, sélecteur « Commander », JSON-LD
robots.txt · sitemap.xml
redirects/                                               règles 301 (Netlify, Apache, nginx, Vercel)
tools/localize-photos.sh                                 rapatrier les photos en local avant production
prospects/india-beau-village/profile.json                fiche de prospection
REBUILD-NOTES.md                                         audit, vérifications, plan 301, liste de lancement
```

## Photos

Les images sont les **vraies photos du restaurant** (galerie officielle, séance de décembre 2024), servies pour l'instant depuis l'hébergement de sa fiche RestoMontreal — le site s'affiche donc complet dès maintenant, sans aucun emplacement vide. Avant la mise en production : exécuter `./tools/localize-photos.sh` (machine connectée requise) pour les auto-héberger dans `assets/img/`, et faire valider le choix et les légendes par le propriétaire, qui peut aussi fournir des photos plus récentes via sa fiche Google Business.

## Bilingue

Un seul moteur pour les deux langues : `site.js` lit `<html lang>` et rend le tableau, les tuiles, les pastilles, les prix (« 11,99 $ » / « $11.99 »), les descriptions et le JSON-LD dans la bonne langue, à partir du même `menu-data.js`. Modifier un prix ou un plat une fois le met à jour partout, dans les deux langues.

## Avant le lancement — 3 validations du propriétaire

1. **Prix en salle** (le tableau affiche les prix de la commande en ligne, juillet 2026) → un seul fichier à éditer : `assets/menu-data.js`.
2. **Photos** : confirmer le choix et les légendes (voir ci-dessus).
3. **Commande directe** : garder ou non l'ancien système indiabeauvillagemontreal.com (option A/B expliquée dans `REBUILD-NOTES.md`, §4) avant d'activer ses 301.

La liste de lancement complète (DNS, Search Console, fiche Google, corrections de citations) est dans `REBUILD-NOTES.md`, §5.
