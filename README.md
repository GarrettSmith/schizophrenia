## Installing
1. Install dependencies: ```npm i```
2. Install global tools: ```npm install -g cordova```
3. Add your cordova platform by running ```cordova platform add %PLATFORM%``` (android and more)

## Usage
- ```npm run lint``` - runs linting against src folder.
- ```npm run test``` - runs karma + jasmine testing.
- ```npm run start``` - starts a server, with react model replacement and devtools.
- ```npm run start:prod``` - starts a server, with react model replacement and minifications of main html file and js file.
- ```npm run build``` - builds the project (single html file and single js file) as it does for development.
- ```npm run build:prod``` - builds the project (single html file and single js file) as it does for production.

## Build and run as application
As you do with any cordova application, ```cordova build android```, ```cordova run android``` and more.

cordova runs ```npm run build:prod``` before any cordova command (using hooks).

<a href="https://learn-reactjs.com/"><img alt="Este.js" src="https://cloud.githubusercontent.com/assets/66249/6515265/b91f0fb8-c388-11e4-857e-c90902e0b7a1.png" width="200"></a>

## Libraries

- [React](http://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/) 
- [Redux](http://rackt.github.io/redux/)
- [babeljs](https://babeljs.io/)
- [immutablejs](http://facebook.github.io/immutable-js)
- [react-router](https://github.com/rackt/react-router)
- [webpack](http://webpack.github.io/)
- [expressjs](http://expressjs.com/)
- [eslint](http://eslint.org/)
- [formatjs](http://formatjs.io/) Universal internationalization.
- [React Helmet](https://github.com/nfl/react-helmet) A document head manager for React.
- [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools)
- [chriso/validator.js](https://github.com/chriso/validator.js) For simple yet powerfull Este sync/async validation.
- [bluebird](https://github.com/petkaantonov/bluebird) Because it's better than native implementation.
- [mochajs](https://mochajs.org/) The fun, simple, flexible JavaScript test framework.
- LESS, SASS, Stylus, or plain CSS with [autoprefixer](https://github.com/postcss/autoprefixer)
- [shortid](https://github.com/dylang/shortid) Short id generator. Url-friendly. Non-predictable.
- [gulp](http://gulpjs.com/) For cross platform scripting.
- And much more. Check source code.

## Prerequisites

- [node.js](http://nodejs.org) (Node 5 with npm 3 is required).
- [gulp](http://gulpjs.com/) (`npm install -g gulp`)

If you are using different node versions on your machine, use [nvm](https://github.com/creationix/nvm) to manage them.

## Tips and Tricks

- To check current app state, just open browser console.
- Install Redux devtools Chrome extension [zalmoxisus/redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)
- With functional programming ([SOLID: the next step is Functional](http://blog.ploeh.dk/2014/03/10/solid-the-next-step-is-functional)), we don't need DI containers. We can use plain old [Pure DI](http://blog.ploeh.dk/2014/06/10/pure-di/). Check `injectDependencies` middleware in `configureStore`.
- Learn immutable.js, for example [Seq](https://github.com/facebook/immutable-js#lazy-seq). Handy even for native arrays and objects. For example, get object values: `Seq(RoomType).toSet().toJS()`
- Recommended editors are [sublimetext](http://www.sublimetext.com/) ([tips](https://github.com/este/este/wiki/Recommended-Sublime-Text-3-settings)) and [atom.io](https://atom.io).

## FAQ

#### Why do I get EACCES error during `npm install`?
 This indicates that you do not have permission to write to the directories that npm uses to store packages and commands. One possible solution is to change the permission to npm's default directory.
 1. Find the path to npm's directory:  `npm config get prefix`  For many systems, this will be `/usr/local`
 2. Change the owner of npm's directory's to the effective name of the current user
 ```
 sudo chown -R `whoami` <directory>
 ```

#### Why does the CSS flicker when starting the app/refreshing it?
In dev mode, webpack loads all the style inline, which makes them hot reloadable. This behaviour disappears in production mode (`gulp -p`).

#### Does Hapi/SailJS/Restify/Rails work with Este? Do you have any example app for this framework?
Yes it does. Este is agnostic of what you use in your backend and is completely decoupled from the API. It uses an Express app for server-side rendering, but you can use anything for your API. The only benefit that an Express API has is that it can simply be `use()` by the main app, like any other middleware.

#### Is it possible use XXX library with Este?
Yes. Este makes little assumptions about your stack, and passing every bit of needed info through props. This is not a framework, nothing prevents you from picking the bits you're interested in.

## Notes

- Este.js dev stack works on OSX, Linux, and Windows.
- As a rule of thumb, Este.js supports all evergreen browsers plus last two pieces of IE.
- Support Este.js development via Bitcoin - [daniel.steigerwald.cz/#donate-estejs](http://daniel.steigerwald.cz/#donate-estejs)
