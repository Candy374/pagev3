#!/usr/bin/env bash

SITE_DIRECTORY="site"

GITHUB_REPO="https://github.com/Candy374/pagev3.git"

GH_PAGES_SITE="https://candy374.github.io/pagev3/"


# Setup repo if doesnt exist
if [ ! -d "$SITE_DIRECTORY" ]; then
  read -p "No site repo setup, can I create it at \"$PWD/$SITE_DIRECTORY\"? [Y/n] " -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]] && [[ ! $REPLY == "" ]]
  then
    echo "Exit by user"
    exit 1
  fi
  git clone "$GITHUB_REPO" "$SITE_DIRECTORY"
  cd "$SITE_DIRECTORY"
  git checkout origin/gh-pages
  git checkout -b gh-pages
  git push --set-upstream origin gh-pages
  cd ../
fi


gulp dist

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
