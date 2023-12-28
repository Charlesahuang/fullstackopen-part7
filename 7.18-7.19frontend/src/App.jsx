import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import Index from './pages/Index';

const App = () => {

  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  );
};
export default App;
