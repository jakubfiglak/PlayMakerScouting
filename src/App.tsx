import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Players from './components/pages/Players';
import Clubs from './components/pages/Clubs';
import Matches from './components/pages/Matches';
import Orders from './components/pages/Orders';
import Reports from './components/pages/Reports';
import AuthState from './context/auth/AuthState';
import PlayersState from './context/players/PlayersState';
import theme from './theme/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthState>
        <PlayersState>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/account" component={Profile} />
              <Route exact path="/players" component={Players} />
              <Route exact path="/clubs" component={Clubs} />
              <Route exact path="/matches" component={Matches} />
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/reports" component={Reports} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </Router>
        </PlayersState>
      </AuthState>
    </ThemeProvider>
  );
};

export default App;
