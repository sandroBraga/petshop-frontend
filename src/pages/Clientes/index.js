import React, { Component } from 'react';
import {Input, Label, Form, Button} from '../../components/form';
import {Table,Tr,} from 'styled-table-component';
import * as clienteService from '../../services/cliente';

const NOVO_CLIENTE = {
  nome: '',
  identidade: '',
  cpf: '',
  email: '',
  senha: '',
  id_perfil: 1,
  id_endereco: 1,
}

export default class Clientes extends Component {
  constructor() {
    super()
    this.state = {
      cliente : NOVO_CLIENTE,
      clientes : [],
      error: ''
    }
  }

  componentDidMount() {
    clienteService.buscarClientes()
    .then((clientes) => this.setState({clientes: clientes})
    ).catch(err => {
      this.setState({error: JSON.stringify(err)});
    });
  }

  handleInputChange = (e) => {
    const {name, value} = e.target
    this.setState({
      cliente: {
        ...this.state.cliente,
        [name]: value
      }
    });
  }

  gravar = () => {
    let {clientes, cliente} = this.state;
    clienteService.gravarClientes(cliente)
      .then(() => {
        if(cliente.id) {
          clientes = clientes.map(c => {
            if(cliente.id === c.id) {
              return cliente;
            }
            return c;
          });
        } else {
          clientes.push(cliente);
        }
        this.setState({
          clientes: clientes,
          cliente: NOVO_CLIENTE
        });
      }).catch(err => {
        console.error('Error ', err);
        this.setState({cliente: NOVO_CLIENTE, error: JSON.stringify(err)});
      });
  }

  editar = (c) => {
    this.setState({cliente: c});
  }

  excluir = (cliente) => {
    let {clientes} = this.state;
    clienteService.excluirClientes(cliente)
      .then(() => {
        this.setState({clientes: clientes.filter(c => cliente.id !== c.id)});
      }).catch(err => {
        console.error('Error ', err);
        this.setState({error: JSON.stringify(err)});
      })
  }

  render() {
    let { cliente, clientes, error } = this.state;
    return (
        <div>
        <div> { error } </div>
          <Form>
            <div>
              <Label>Nome:</Label>
              <Input type="text" name="nome"  onChange={this.handleInputChange} value={cliente.nome} />
            </div>
            <div>
              <Label>RG:</Label>
              <Input type="text" name="identidade" onChange={this.handleInputChange} value={cliente.identidade} />
            </div>
            <div>
              <Label>CPF:</Label>
              <Input type="text" name="cpf" onChange={this.handleInputChange} value={cliente.cpf} />
            </div>
            <div>
              <Label>Email:</Label>
              <Input type="email"name="email" onChange={this.handleInputChange} value={cliente.email} />
            </div>

            <Button onClick={this.gravar} >Salvar</Button>
          </Form>
          <br />
          <hr />
          <div>
            <Table>
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Identidade</th>
                  <th scope="col">CPF</th>
                  <th scope="col">Email</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
              {clientes.map((c) => {
                return(
                  <Tr active key={c.id}>
                    <td>{c.nome}</td>
                    <td>{c.identidade}</td>
                    <td>{c.cpf}</td>
                    <td>{c.email}</td>
                    <td><Button onClick={() => this.editar(c)}>Editar</Button></td>
                    <td><Button onClick={() => this.excluir(c)}>Excluir</Button></td>
                  </Tr>
                )
              })}
              </tbody>
            </Table>
          </div>
        </div>
    )
  }
}
