#!/usr/bin/env node

/**
 * a-youtube
 *
 * Generate A-Frame scene markup for 360° panoramic scenes from YouTube URLs.
 */

const fs = require('fs');

const ncp = require('copy-paste');
const vidl = require('vimeo-downloader');

const argv = process.argv.slice(2);
if (!argv.length) {
  process.exit(0);
}

let args = {};
argv.forEach(function (argName) {
  args[argName] = typeof argv[argName] === 'undefined' ? true : argv[argName];
});

const vimeoUrl = (argv[0] || '').trim();
const slug = (args['--slug'] || args['--s'] || args['-slug'] || args['-s'] || argv[1] || '').trim() || 'video';
const filename = slug + '.mp4';

console.log(vimeoUrl);
vidl(vimeoUrl).pipe(fs.createWriteStream(filename));
