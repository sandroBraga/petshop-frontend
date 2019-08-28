import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/petshop-icon.png";
import { Form, Container } from "./styles";
import api from "../../services/api";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    try {
      await api.post("/login", { email, password });
      this.props.history.push("/");
    } catch (err) {
      console.log(err);
      this.setState({error: 'opa'});
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="React logo" />
          {this.state.error && <p>{this.state.error} </p>}
          <input type="text" placeholder="nome" onChange={e => this.setState({username: e.target.value})} />
          <input type="email" placeholder="email" onChange={e => this.setState({email: e.target.value})} />
          <input type="password" placeholder="senha" onChange={e => this.setState({password: e.target.value})} />
          <button type="submit">Cadastrar</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);