#!/usr/bin/env node

/**
 * a-flickr
 *
 * Generate A-Frame scene markup for 360° panoramic scenes from Flickr URLs.
 */

const ncp = require('copy-paste');
const flickrPhotoUrl = require('flickr-photo-url');

const argv = process.argv.slice(2);
if (!argv.length) {
  process.exit(0);
}

let args = {};
argv.forEach(function (argName) {
  args[argName] = typeof argv[argName] === 'undefined' ? true : argv[argName];
});

let photoUser;
let photoId;
const slug = (args['--slug'] || args['--s'] || args['-slug'] || args['-s'] || argv[1] || '').trim() || 'sky';
const format = 'aframe';

const flickrUrl = (argv[0] || '').trim();
const matches = flickrUrl.match(/flickr.com.+photos\/([^\/]+)\/([^\/]+)/i);

if (matches) {
  photoUser = matches[1];
  photoId = parseInt(matches[2], 10);
}

flickrPhotoUrl(photoUser, photoId, flickrPhotoUrl.sizes.original).then(photoUrl => {
  if (format === 'aframe') {
    output = `
<a-scene>
  <a-assets>
    <a-asset-item id="${slug}"
      data-asset-source="flickr"
      data-asset-source-url="${flickrUrl}"
      data-asset-source-flickr-image-author="${photoUser}"
      data-asset-source-flickr-image-id="${photoId}"
      data-asset-source-flickr-image-url="${photoUrl}"
      src="${photoUrl}"></a-asset-item>
  </a-assets>

  <a-sky src="#${slug}"></a-sky>
</a-scene>
`;
  } else {
    output = photoUrl;
  }

  output = output.trim();

  ncp.copy(output + '\n', function () {
    console.log(output);
  });
});
