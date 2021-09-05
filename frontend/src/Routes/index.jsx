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
          <Route path="/:activationcode">
            <LoginPage />
          </Route>
          <Route exact path="/mainpage">
            <MainPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
