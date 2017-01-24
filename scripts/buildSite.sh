
SITE_DIRECTORY="site”

GITHUB_REPO="https://github.com/Candy374/pagev3.git"

GH_PAGES_SITE="https://candy374.github.io/pagev3/"





Gulp dist

open dist/index.html


cd "$SITE_DIRECTORY"

git reset --hard

git checkout -- ..

git clean -dfx

git fetch

git rebase

rm -Rf *

echo "$PWD"

cp -R ../dist/* .

git add --all

git commit -m "Update website"

git push

sleep 1

open $GH_PAGES_SITE
