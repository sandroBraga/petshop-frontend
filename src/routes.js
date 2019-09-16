import React from "react";
import { BrowserRouter, Route, Switch, Redirect, NavLink, HashRouter } from "react-router-dom";
import { isAuthenticated, isAdmin, isAtendente } from "./services/auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import Servicos from "./pages/Relatorios/Servicos";

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
    !isAuthenticated()
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
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            { isAtendente() && <li><NavLink to="/clientes">Clientes</NavLink></li> }
            { isAdmin() && <li><NavLink to="/produtos">Produtos</NavLink></li> }
            { isAdmin() && <li><NavLink to="/relatorio-servicos">Relatorio Serviços</NavLink></li> }
          </ul>
          <div className="content">
            <Route exact path="/" component={() => <div>OK</div>} />
            <Route exact path="/clientes" component={Clientes} />
            <Route exact path="/produtos" component={Produtos} />
            <Route exact path="/relatorio-servicos" component={Servicos} />
          </div>
        </div>
      </HashRouter>
    )
  }
 </div>
)



export default Routes;
