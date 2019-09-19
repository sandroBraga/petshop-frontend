import React, { Component } from 'react';
import {Input, Label, Form, Button} from '../../../components/form';
import {Table,Tr,} from 'styled-table-component';

const SERVICOS_MOCK = [{
  	"idEvento": 1,
  	"pet": {
  		"id": 1,
  		"nome": "toto"
  	},
    "cliente": {
      "nome": "Braia"
    },
  	"responsavel": {
  		"perfil": "Atendente",
  		"nome": "Wilson"
  	},
  	"formaPagamento": "Dinheiro",
  	"servico": {
  		"descricao": "Tosa"
  	},
  	"horaEvento": "new Date()",
  	"valor": 100.00,
  	"presenca": "SIM",
  	"notaServico": 3
  }, {
  	"idEvento": 2,
  	"pet": {
  		"id": 1,
  		"nome": "toto"
  	},
    "cliente": {
      "nome": "Braia"
    },
  	"responsavel": {
  		"perfil": "",
  		"nome": ""
  	},
  	"formaPagamento": 1,
  	"servico": {
  		"descricao": ""
  	},
  	"horaEvento": "new Date()",
  	"valor": 100.00,
  	"presenca": true,
  	"notaServico": 3
  }]

export default class Servicos extends Component {
  constructor() {
    super()
    this.state = {
      servicos: SERVICOS_MOCK,
      error: ''
    }
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
                  <th scope="col">Cliente</th>
                  <th scope="col">Pet</th>
                  <th scope="col">Responsável</th>
                  <th scope="col">Perfil Responsável</th>
                  <th scope="col">Forma de Pagamento</th>
                  <th scope="col">Hora Evento</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Presenca</th>
                  <th scope="col">NotaServico</th>
                </tr>
              </thead>
              <tbody>
              {servicos.map((s) => {
                return(
                  <Tr active key={s.idEvento}>
                    <td>{s.servico.descricao}</td>
                    <td>{s.cliente.nome}</td>
                    <td>{s.pet.nome}</td>
                    <td>{s.responsavel.nome}</td>
                    <td>{s.responsavel.perfil}</td>
                    <td>{s.formaPagamento}</td>
                    <td>{s.horaEvento}</td>
                    <td>{s.valor}</td>
                    <td>{s.presenca}</td>
                    <td>{s.notaServico}</td>
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
