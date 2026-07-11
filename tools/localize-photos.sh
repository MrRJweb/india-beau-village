#!/usr/bin/env bash
# ============================================================
# India Beau Village — rapatrier les photos en local (FR + EN)
# Le site pointe pour l'instant vers la galerie officielle du
# restaurant (portal.restodata.ca, séance de décembre 2024).
# Avant la mise en production, exécuter ce script sur une
# machine connectée : il télécharge les photos dans assets/img/
# et réécrit les 8 pages HTML vers les chemins locaux.
#   ./tools/localize-photos.sh          (depuis la racine du dépôt)
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

BASE="https://portal.restodata.ca/india-beau-village/gallery/images"
mkdir -p assets/img

declare -A USED=(
  [01_india-beau-_532-2024-12-05.jpg]=maison-01.jpg
  [02_india-beau-_532-2024-12-05.jpg]=maison-02.jpg
  [03_india-beau-_532-2024-12-05.jpg]=maison-03.jpg
  [05_india-beau-_384-2024-12-05.jpg]=maison-05.jpg
  [06_india-beau-_891-2024-12-05.jpg]=maison-06.jpg
  [11_india-beau-_384-2024-12-05.jpg]=maison-11.jpg
  [12_india-beau-_532-2024-12-05.jpg]=maison-12.jpg
  [19_india-beau-_891-2024-12-05.jpg]=maison-19.jpg
)

for src in "${!USED[@]}"; do
  echo "→ ${USED[$src]}"
  curl -fsSL --referer "" "$BASE/$src" -o "assets/img/${USED[$src]}"
done
echo "→ facade-cover.jpg"
curl -fsSL --referer "" "https://portal.restodata.ca/india-beau-village/logo/cover.jpg?v=578" -o "assets/img/facade-cover.jpg"

# Réécrire les pages (FR à la racine, EN dans en/) vers les chemins locaux
for f in index.html menu.html a-propos.html contact.html \
         en/index.html en/menu.html en/about.html en/contact.html; do
  case "$f" in en/*) P="../assets/img" ;; *) P="assets/img" ;; esac
  for src in "${!USED[@]}"; do
    sed -i "s|$BASE/$src|$P/${USED[$src]}|g" "$f"
  done
  sed -i "s|https://portal.restodata.ca/india-beau-village/logo/cover.jpg?v=578|$P/facade-cover.jpg|g" "$f"
  # og:image et JSON-LD doivent rester en URL absolue :
  sed -i "s|content=\"$P/maison-01.jpg\"|content=\"https://indiabeauvillage.com/assets/img/maison-01.jpg\"|g" "$f"
  sed -i "s|\"$P/maison-01.jpg\", \"$P/facade-cover.jpg\"|\"https://indiabeauvillage.com/assets/img/maison-01.jpg\", \"https://indiabeauvillage.com/assets/img/facade-cover.jpg\"|g" "$f"
done

# Les 12 autres photos de la galerie (choix de rechange pour le propriétaire)
for n in 04_india-beau-_227 07_india-beau-_532 08_india-beau-_532 09_india-beau-_532 \
         10_india-beau-_532 13_india-beau-_532 14_india-beau-_532 15_india-beau-_532 \
         16_india-beau-_532 17_india-beau-_227 18_india-beau-_532 20_india-beau-_532; do
  curl -fsSL --referer "" "$BASE/${n}-2024-12-05.jpg" -o "assets/img/extra-${n%%_*}.jpg" || true
done

echo "Terminé. Vérifier les pages FR et EN, puis valider les photos avec le propriétaire."
