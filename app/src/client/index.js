import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';

const App = lazy(() => import('./App'));

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
