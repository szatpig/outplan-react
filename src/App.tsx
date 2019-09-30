import React from 'react';
import { Provider } from 'react-redux'

import './less/index.less'
import store from './store'

import Pages from './pages'

const App: React.FC = () => {
  return (
      <Provider store={ store }>
          <Pages />
      </Provider>
  );
}

export default App;
