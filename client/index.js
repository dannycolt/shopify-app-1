import * as React from 'react';
import 'isomorphic-fetch';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Welcome from './Welcome';
import DesktopApp from './DesktopApp';
import PosApp from './PosApp';

import { Switch, Route, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';


function renderApp() {
  render(
    <AppContainer>
      <BrowserRouter>
        <React.Fragment>
          <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/pos" component={PosApp} />
          <Route path="/desktop" component={DesktopApp} />
          </Switch>
        </React.Fragment>
       </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp();

if (module.hot) {
  module.hot.accept();
}
