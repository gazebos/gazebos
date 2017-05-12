#!/usr/bin/env node

/**
 * a-youtube
 *
 * Generate A-Frame scene markup for 360° panoramic scenes from YouTube URLs.
 */

const ncp = require('copy-paste');
const ytdl = require('ytdl-core');

const argv = process.argv.slice(2);
if (!argv.length) {
  process.exit(0);
}

let args = {};
argv.forEach(function (argName) {
  args[argName] = typeof argv[argName] === 'undefined' ? true : argv[argName];
});

let youtubeId;
const slug = (args['--slug'] || args['--s'] || args['-slug'] || args['-s'] || argv[1] || '').trim() || 'videosphere';
const format = 'aframe';

const youtubeUrl = (argv[0] || '').trim();

ytdl(youtubeUrl).then(photoUrl => {
  if (format === 'aframe') {
    output = `
<a-scene>
  <a-assets>
    <a-asset-item id="${slug}"
      data-asset-source="youtube"
      data-asset-source-url="${youtubeUrl}"
      data-asset-source-youtube-image-author="${photoUser}"
      data-asset-source-youtube-image-id="${photoId}"
      data-asset-source-youtube-image-url="${photoUrl}"
      src="${photoUrl}"></a-asset-item>
  </a-assets>

  <a-videosphere src="#${slug}"></a-videosphere>
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
