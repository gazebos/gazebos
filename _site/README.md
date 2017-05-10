# gazebos

Bite-sized [WebVR](https://webvr.rocks/) experiences.

**[Try it out!](https://gazebos.io/)**


## Usage

1. [Load **https://gazebos.io/**](https://gazebos.io/).
2. Add your A-Frame scene markup to `_scenes/<username>/<scene>.html`.
3. Thank you for contributing!


## Installation

Follow [these directions for using GitHub Pages with Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/).

First, ensure [Node](https://nodejs.org/download/) is installed. From the command line, run this command to install the dependencies:

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

To update the site index on the GH Pages site, you'll need to run the index build script. Just clone the project to your local machine, open your command-line interface (e.g., `Terminal` on Mac, `Command Prompt` on Windows), and `cd` into the repo's directory. Then, run `script/build_site_index` and commit your changes. Once the new index is commuted and pushed, it will be live as soon as the CDN updates (roughly a few minutes).


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

### Performance insights

```sh
npm run pagespeed
```

### Accessibility

```sh
npm run accessibility
```



## License

All code and content within this source-code repository is licensed under the [**Creative Commons Zero v1.0 Universal** license (CC0 1.0 Universal; Public Domain Dedication)](LICENSE.md).

You can copy, modify, distribute and perform this work, even for commercial purposes, all without asking permission.

For more information, refer to these following links:

* a copy of the [license](LICENSE.md) in [this source-code repository](https://github.com/gazebos/gazebos)
* the [human-readable summary](https://creativecommons.org/publicdomain/zero/1.0/) of the [full text of the legal code](https://creativecommons.org/publicdomain/zero/1.0/legalcode)
* the [full text of the legal code](https://creativecommons.org/publicdomain/zero/1.0/legalcode)
