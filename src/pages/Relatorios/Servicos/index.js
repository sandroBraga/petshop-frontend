import React, { Component } from 'react';
import {Input, Label, Form, Button} from '../../../components/form';
import {Table,Tr,} from 'styled-table-component';

export default class Servicos extends Component {
  constructor() {
    super()
    this.state = {
      servicos : [],
      error: ''
    }
  }

  componentDidMount() {
    /*clienteService.buscarClientes()
    .then((clientes) => this.setState({clientes: clientes})
    ).catch(err => {
      this.setState({error: JSON.stringify(err)});
    });*/
  }

  handleInputChange = (e) => {
    /*const {name, value} = e.target
    this.setState({
      cliente: {
        ...this.state.cliente,
        [name]: value
      }
    });*/
  }

  render() {
    let { servicos, error } = this.state;
    return (
        <div>
        <div> { error } </div>
          <div>
            <Table>
              <thead>
                <tr>
                  <th scope="col">Descricao</th>
                </tr>
              </thead>
              <tbody>
                  <Tr>
                    <td>3</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                  </Tr>
              </tbody>
            </Table>
          </div>
        </div>
    )
  }
}
