import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Corona from './components/Stats/Corona';

function App() {
  return (
    <Router>
      <Switch></Switch>
      <Corona />
    </Router>
  );
}

export default App;
