import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NoMatch from './components/Layout/NoMatch';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Corona from './components/Stats/Corona';
import { translationEn, translationPtBr, translationEs } from './components/Utils/Utils';
import { TranslatorProvider } from 'react-translate';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <TranslatorProvider translations={translationEn}>
            <Corona tCountry={'en'} />
          </TranslatorProvider>
        </Route>
        <Route path='/pt-br' exact>
          <TranslatorProvider translations={translationPtBr}>
            <Corona tCountry={'br'} />
          </TranslatorProvider>
        </Route>
        <Route path='/es' exact>
          <TranslatorProvider translations={translationEs}>
            <Corona tCountry={'es'} />
          </TranslatorProvider>
        </Route>
        <Route path='*' exact component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
