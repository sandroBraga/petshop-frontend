import React from "react";
import { BrowserRouter, Route, Switch, Redirect, NavLink, HashRouter } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import styled from "styled-components";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Clientes from "./pages/Clientes";
import Header from "./components/header"

import  "./styles/menu.module.css"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    { ...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location}} } />
      )}
  />
);

const Routes = () => (
  <div>
  {
    isAuthenticated()
    ? (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
     )
    : (
      <HashRouter>
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/clientes">Clientes</NavLink></li>
            <li><NavLink to="/servicos">Serviços</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={() => <div>OK</div>} />
            <Route exact path="/clientes" component={Clientes} />
            <Route exact path="/servicos" component={() => <div>Serviços</div>} />
          </div>
        </div>
      </HashRouter>
    )
  }
 </div>
)



export default Routes;
