import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';
import Main from './components/main';

const mainElement = document.getElementById('main');

function renderApp() {
  render((
    <AppContainer>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </AppContainer>
    ),
    mainElement,
  );
}

renderApp();
if (module.hot) module.hot.accept('./components/main', renderApp);
