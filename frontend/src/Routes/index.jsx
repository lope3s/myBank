import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ExpandedCardPage from "../pages/ExpandedCardPage";
import PrivateRoute from "./privateRoute";

const Routes = () => {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <PrivateRoute exact path ="/mainpage">
            <MainPage />
          </PrivateRoute>
          <PrivateRoute exact path = "/explicitGoal/:userId/:goalId">
            <ExpandedCardPage/>
          </PrivateRoute>  
          <Route exact path="/:activationcode">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
