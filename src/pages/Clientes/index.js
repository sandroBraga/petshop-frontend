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
    .then((clientes) => this.setState({clientes: clientes, clientesOriginais: clientes})
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

  procurarClientes = (e) => {
    let clientesFiltrados = [];
    const { clientes } = this.state;
    if(e.target.value !== "") {
      clientesFiltrados = clientes.filter(c => c.nome.includes(e.target.value));
    } else {
      clientesFiltrados = this.state.clientesOriginais;
    }
    this.setState({clientes: clientesFiltrados});
  }

  gravar = () => {
    let {clientes, cliente} = this.state;
    console.log('cliente ', cliente);
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
              <Input type="text" name="identidade" maxLength="14" onChange={this.handleInputChange} value={cliente.identidade} />
            </div>
            <div>
              <Label>CPF:</Label>
              <Input type="text" name="cpf" maxLength="12" placeholder="Ex.: 000.000.000-00" onChange={this.handleInputChange} value={cliente.cpf} />
            </div>
            <div>
              <Label>Email:</Label>
              <Input type="email" name="email" onChange={this.handleInputChange} value={cliente.email} />
            </div>
            <div>
              <Label>Senha:</Label>
              <Input type="text" name="senha" onChange={this.handleInputChange} value={cliente.senha} />
            </div>
            <div>
              <Label>Rua:</Label>
              <Input type="text"name="rua" onChange={this.handleInputChange} value={cliente.rua} />
            </div>
            <div>
              <Label>Numero:</Label>
              <Input type="number"name="numero" onChange={this.handleInputChange} value={cliente.numero} />
            </div>
            <div>
              <Label>CEP:</Label>
              <Input type="text"name="cep" onChange={this.handleInputChange} value={cliente.cep} />
            </div>
            <div>
              <Label>Bairro:</Label>
              <Input type="text"name="bairro" onChange={this.handleInputChange} value={cliente.bairro} />
            </div>
            <div>
              <Label>UF:</Label>
              <Input type="text"name="uf" maxLength="2" onChange={this.handleInputChange} value={cliente.uf} />
            </div>
            <div>
              <Label>Cidade:</Label>
              <Input type="text"name="cidade" onChange={this.handleInputChange} value={cliente.cidade} />
            </div>

            <Button onClick={this.gravar} >Salvar</Button>
          </Form>
          <br />
          <hr />
          <div>
            <Label>Pesquisar:</Label>
            <Input type="text" name="clienteFinder" onChange={this.procurarClientes} placeholder="Nome do Cliente"/>
            <hr />
          </div>
          <div>
            <Table>
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Identidade</th>
                  <th scope="col">CPF</th>
                  <th scope="col">Email</th>
                  <th scope="col">Rua</th>
                  <th scope="col">Numero</th>
                  <th scope="col">CEP</th>
                  <th scope="col">Bairro</th>
                  <th scope="col">UF</th>
                  <th scope="col">Cidade</th>
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
                    <td>{c.rua}</td>
                    <td>{c.numero}</td>
                    <td>{c.cep}</td>
                    <td>{c.bairro}</td>
                    <td>{c.uf}</td>
                    <td>{c.cidade}</td>
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
