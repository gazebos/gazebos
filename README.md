# gazebos

Bite-sized [WebVR](https://webvr.rocks/) experiences.

**[Try it out!](https://gazebos.io/)**


## Usage

1. [Load **https://gazebos.io/**](https://gazebos.io/), and _dive_ right in!
2. Add your [A-Frame](https://aframe.io/docs/) scene markup to `_scenes/<username>/<scene>.html`.
3. Find some _public-domain_ assets (or, better yet: make your own assets from scratch).
4. Use the various tools in the [`_tools`](_tools) directory: for trimming videos to be <= 10 seconds long, for downloading YouTube/Vimeo videos, images from Flickr (e.g., [these equirectangular ones](https://www.flickr.com/groups/equirectangular/)), and a boilerplate for launching Chrome headlessly (if you want to do some automation/site scraping).
5. Thank you for building and [sharing](#contributing) your creativity!


## Installation

First, ensure [Ruby](https://www.ruby-lang.org/en/documentation/installation/) is installed, which is needed for [Jekyll](https://jekyllrb.com). Follow [these directions for setting up a local development Jekyll environment (à la GitHub Pages in production)](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/).

First, ensure [Node](https://nodejs.org/download/) is installed. From the command line, install the dependencies:

```sh
npm install
```


## Contributing

Feel free to open a [pull request](https://github.com/gazebos/gazebos/pulls) to submit a WebVR scene. Please notice that any code and art assets submitted must be and will be licensed under a [**Creative Commons Zero v1.0 Universal** license (CC0 1.0 Universal; Public Domain Dedication)](LICENSE.md).

1. [Fork](https://help.github.com/articles/fork-a-repo/) [this repository](https://github.com/gazebos/gazebos/fork) to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Install the dependencies: `npm install`
3. Run `npm link` to link the local repo to NPM.
4. Run `npm run build` to build and watch for code changes.
5. Then, from within your project's directory: `npm link next`
6. Now you can run your app with the local version of `gazebos`.


## Development

From the command line, run this command to start the local Node development server:

```sh
npm start
```

### Live-reloading in the browser (with cross-device synchronization)

```sh
npm run serve
```

### Build and optimize

```sh
npm run build
```

### Optimize images

```sh
npm run build-img
```

### Performance insights

```sh
npm run pagespeed
```

### Accessibility

```sh
npm run a11y
```



## License

All code and content within this source-code repository is licensed under the [**Creative Commons Zero v1.0 Universal** license (CC0 1.0 Universal; Public Domain Dedication)](LICENSE.md).

You can copy, modify, distribute and perform this work, even for commercial purposes, all without asking permission.

For more information, refer to these following links:

* a copy of the [license](LICENSE.md) in [this source-code repository](https://github.com/gazebos/gazebos)
* the [human-readable summary](https://creativecommons.org/publicdomain/zero/1.0/) of the [full text of the legal code](https://creativecommons.org/publicdomain/zero/1.0/legalcode)
* the [full text of the legal code](https://creativecommons.org/publicdomain/zero/1.0/legalcode)
