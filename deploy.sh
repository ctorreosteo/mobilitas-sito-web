#!/usr/bin/env bash
# Compila il sito e lo pubblica su Firebase Hosting.
#
# Uso:
#   ./deploy.sh
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$root"

for command in npm node firebase; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "Comando mancante: $command"
    exit 1
  fi
done

firebase_project_id="$(
  node --input-type=commonjs \
    -p "JSON.parse(require('fs').readFileSync('$root/.firebaserc', 'utf8')).projects.default"
)"

if [[ -z "$firebase_project_id" ]]; then
  echo "Impossibile leggere projects.default da '$root/.firebaserc'."
  exit 1
fi

firebase_deploy_key="$root/.secrets/firebase-deploy.json"
firebase_isolated_home=""

if [[ -z "${GOOGLE_APPLICATION_CREDENTIALS:-}" && -f "$firebase_deploy_key" ]]; then
  export GOOGLE_APPLICATION_CREDENTIALS="$firebase_deploy_key"
  firebase_isolated_home="$(mktemp -d)"
  trap 'rm -rf "$firebase_isolated_home"' EXIT
  echo "Uso service account: $firebase_deploy_key"
elif [[ -z "${GOOGLE_APPLICATION_CREDENTIALS:-}" ]]; then
  echo "Nessun service account locale: uso il login di Firebase CLI."
fi

firebase_cli() {
  if [[ -n "$firebase_isolated_home" ]]; then
    HOME="$firebase_isolated_home" firebase "$@"
  else
    firebase "$@"
  fi
}

echo "=== Build sito web ==="
npm run build

if [[ ! -f "$root/dist/index.html" ]]; then
  echo "Build non valida: manca '$root/dist/index.html'."
  exit 1
fi

echo
echo "=== Deploy Firebase Hosting: $firebase_project_id ==="
firebase_cli deploy --only hosting --project "$firebase_project_id"

echo
echo "Deploy completato."
