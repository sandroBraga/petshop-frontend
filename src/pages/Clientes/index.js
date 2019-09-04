import React, { Component } from 'react';
import {Input, Label, Form, Button} from '../../components/form';
import {Table,Tr,} from 'styled-table-component';


export default class Clientes extends Component {

  constructor(){
    super()
    this.state = {
      cliente : {
        nome: '',
        rg: '',
        cpf: '',
        email: ''
      },
      clientes : []
    }
  }

  // componentDidMount(){
  //   servico.getClientes()
  //   .then((clientes) => this.setState({clientes: clientes}));
  // }

  handleInputChange = (e) => {
    // if(!e.target.value){
    //   return;
    // }

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
    clientes.push(cliente);
    this.setState({
      clientes : clientes
    });


    console.log(this.state.cliente);
  }

  render() {
    let { cliente, clientes } = this.state;
    return (
        <div>
          <Form>
            <div>
              <Label>Nome:</Label>
              <Input type="text" name="nome"  onChange={this.handleInputChange} value={cliente.nome} />
            </div>
            <div>
              <Label>RG:</Label>
              <Input type="text" name="rg" onChange={this.handleInputChange} value={cliente.rg} />
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
          <div>
            <Table>
              <thead>
                <th scope="col">nome</th>
                <th scope="col">rg</th>
                <th scope="col">cpf</th>
                <th scope="col">email</th>
              </thead>
              <tbody>
              {clientes.map((c) => {
                return(
                  <Tr active key={c.cpf}>
                    <td>{c.nome}</td>
                    <td>{c.rg}</td>
                    <td>{c.cpf}</td>
                    <td>{c.email}</td>
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
