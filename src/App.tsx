import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Register,
  Login,
  Home,
  Profile,
  Players,
  Clubs,
  Matches,
  Orders,
  Reports,
  Report,
} from './components/pages';
import { AuthState, SimplifiedDataState } from './context';
import theme from './theme/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthState>
        <SimplifiedDataState>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/account" component={Profile} />
              <Route exact path="/players" component={Players} />
              <Route exact path="/clubs" component={Clubs} />
              <Route exact path="/matches" component={Matches} />
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/reports" component={Reports} />
              <Route exact path="/reports/:id" component={Report} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </Router>
        </SimplifiedDataState>
      </AuthState>
    </ThemeProvider>
  );
};

export default App;
