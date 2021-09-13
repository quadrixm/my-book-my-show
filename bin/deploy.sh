git checkout main
git pull

npm --prefix frontend/ install
npm --prefix frontend/ run build

npm --prefix backend/ install
npm --prefix backend/ run build

mkdir "backend/public"

rm -r backend/public/*
cp -r frontend/build/* backend/public

