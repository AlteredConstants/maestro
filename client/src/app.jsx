import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import reducer from 'reducer';
import { getFencers, getSampleEvent } from 'action';
import Main from './components/main';

global.passlog = (x) => {
  if (x.then) {
    return x.then((y) => {
      console.log(y);
      return y;
    });
  }
  console.log(x);
  return x;
};

const middleware = applyMiddleware(promiseMiddleware());
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(middleware));

const mainElement = document.getElementById('main');

function renderApp() {
  render((
    <AppContainer>
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    </AppContainer>
    ),
    mainElement,
  );
}

[getFencers(), getSampleEvent()].map(store.dispatch);

renderApp();
if (module.hot) module.hot.accept('./components/main', renderApp);
