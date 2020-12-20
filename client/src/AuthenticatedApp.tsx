import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Home,
  Profile,
  Players,
  Clubs,
  Matches,
  Orders,
  Reports,
  Report,
  AccessManagement,
} from './components/pages';
import { SimplifiedDataState, useAuthState } from './context';

export const AuthenticatedApp = () => {
  const { loadUser, user } = useAuthState();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
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
          <Route exact path="/accessmanagement" component={AccessManagement} />
        </Switch>
      </Router>
    </SimplifiedDataState>
  );
};
