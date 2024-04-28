import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MapboxProvider } from '@/client/context/MapboxContext';
import Home from '@/client/pages/Home';

const App = () => {
  return (
    <Router>
      {/* TODO: Consider using CustomConfigProvider for global configuration management */}
      {/* TODO: Consider using IntlLocaleProvider for internationalization support */}
      {/* TODO: Future additions might include global contexts like AuthContext, ThemeContext */}
      <Routes>
        <Route path="/" element={
          <MapboxProvider>
            <Home />
          </MapboxProvider>
        } />
        {/* TODO: Add additional routes such as a login page, user account page, etc. */}
        {/* TODO: May need to add route guards (AuthRoute) to handle authentication */}
      </Routes>
    </Router>
  );
};

export default App;
