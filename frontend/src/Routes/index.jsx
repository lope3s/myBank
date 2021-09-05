import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

const Routes = () => {
  return (
    <>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about"></Route>
          <Route path="/users"></Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;