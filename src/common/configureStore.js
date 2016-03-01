import appReducer from './app/reducer';
import {STORAGE_KEY} from './app/constants';

import * as storage from 'redux-storage';
import debounceDecorator from 'redux-storage-decorator-debounce';
import createStorageEngine from 'redux-storage-engine-reactnativeasyncstorage';
import createLogger from 'redux-logger';
//import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';

import createFetch from './createFetch';
import shortid from 'shortid';
import validate from './validate';
import promiseMiddleware from 'redux-promise-middleware';

import {applyMiddleware, compose, createStore} from 'redux';

import {curry, evolve, flip, merge} from 'ramda';

export default function configureStore({deps, initialState}) {

  // Este dependency injection middleware. So simple that we don't need a lib.
  // It's like mixed redux-thunk and redux-inject.
  const injectMiddleware = deps => store => next => action =>
    next(typeof action === 'function'
      ? action({...deps, store})
      : action
    );

  // Remember to set SERVER_URL for deploy.
  const serverUrl = process.env.SERVER_URL ||
    // Browser is ok with relative url. Server and React Native need absolute.
    (process.env.IS_BROWSER ? '' : 'http://localhost:8000');

  // Storage
  const reducer = storage.reducer(appReducer);
  const debounce = curry(flip(debounceDecorator));
  const transformState = transform => engine => merge(
    engine,
    {
      save(state) {
        const blacklistedState = evolve(transform, state);
        return engine.save(blacklistedState);
      },
    }
  );
  const blacklist = transformState({
    ui: {
      drawerOpen: () => undefined,
    },
  });
  const createDecoratedEngine = compose(
    debounce(60),
    blacklist,
    createStorageEngine
  );
  const storageEngine = createDecoratedEngine(STORAGE_KEY);
  const storageMiddleware = storage.createMiddleware(storageEngine);

  const middleware = [
    injectMiddleware({
      ...deps,
      fetch: createFetch(serverUrl),
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      validate,
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
    }),
    storageMiddleware,
  ];

  // Check state for mutations in development
  // disable until https://github.com/facebook/react-native/commit/194092e7290c2a2e50e0263bac67686df418b915
  //if (process.env.NODE_ENV !== 'production') {
    //middleware.push(immutableStateInvariantMiddleware());
  //}

  // Enable logger only for browser and React Native development.
  const enableLogger = process.env.NODE_ENV !== 'production' &&
    (process.env.IS_BROWSER || process.env.IS_REACT_NATIVE);

  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state)),
    });
    // Logger must be the last middleware in chain.
    middleware.push(logger);
  }

  const createStoreWithMiddleware = applyMiddleware(...middleware);

  const enableDevToolsExtension =
    process.env.NODE_ENV !== 'production' &&
    process.env.IS_BROWSER &&
    window.devToolsExtension;

  const createReduxStore = enableDevToolsExtension
    ? compose(createStoreWithMiddleware, window.devToolsExtension())
    : createStoreWithMiddleware;
  const store = createReduxStore(createStore)(reducer, initialState);

  // Enable hot reload where available.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./app/reducer', () => {
      const nextAppReducer = require('./app/reducer');
      store.replaceReducer(nextAppReducer);
    });
  }

  // Load store state from storage
  const load = storage.createLoader(storageEngine);
  load(store)
    .catch(() => console.error('Failed to load stored state'));

  return store;
}
