import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../../assets/petshop-icon.png";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    senha: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, senha } = this.state;
    if (!email || !senha) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/login", { email, senha });
        localStorage.setItem('usuario_logado', JSON.stringify(response.data[0]));
        login(response.data.token);
        window.location.reload();
      } catch (err) {
        this.setState({error:"Houve um problema com o login, verifique suas credenciais. T.T"});
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <hr />
          <img src={Logo} alt="Petshop logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input type="email" placeholder="Endereço de e-mail" onChange={e => this.setState({ email: e.target.value })} />
          <input type="password" placeholder="Senha" onChange={e => this.setState({ senha: e.target.value })} />
          <button type="submit">Entrar</button>
          <hr />
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);
