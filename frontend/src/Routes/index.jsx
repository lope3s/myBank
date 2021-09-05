import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";

const Routes = () => {
  return (
    <>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/mainpage">
            <MainPage />
          </Route>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/:activationcode">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
