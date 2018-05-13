import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import rootSaga from './containers/App/saga';

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
