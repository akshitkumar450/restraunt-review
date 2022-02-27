import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Details from "./pages/Details";
import { useSelector } from "react-redux";
import AllUsers from "./pages/AllUsers";
import Home from "./pages/Home";

function Routes() {
  const user = useSelector((state) => state.user.user);
  return (
    <BrowserRouter>
      <Navbar />
      {!user ? (
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/users">
            <AllUsers />
          </Route>
          <Route exact path="/details/:id">
            <Details />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default Routes;
