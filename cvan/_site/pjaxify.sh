#!/bin/bash

mkdir -p js css
cp ../hoops.js js/.
cp ../hoops.css css/.

# Make the Jekyll site PJAX-esque.

for fn in `ls *.html`; do

  cp -f $fn snippets/. &&

    find snippets -name "*.html" -print0 | xargs -0 sed -i "" "s/layout: [a-zA-Z0-9]*/layout: pjax/g"

done

jekyll build --incremental

# mkdir -p _site/
# cp .htaccess _site/.
# rm _site/pjaxify.sh

jekyll serve --watch
