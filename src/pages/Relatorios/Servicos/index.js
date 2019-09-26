import React, { Component } from 'react';
import {Input, Label, Form, Button} from '../../../components/form';
import {Table,Tr,} from 'styled-table-component';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SERVICOS_MOCK = [{
  	"idEvento": 1,
  	"pet": {
  		"id": 1,
  		"nome": "toto"
  	},
    "cliente": {
      "nome": "Cliente 1"
    },
  	"responsavel": {
  		"perfil": "Atendente",
  		"nome": "Wilson"
  	},
  	"formaPagamento": "Dinheiro",
  	"servico": {
  		"descricao": "Tosa"
  	},
  	"horaEvento": '22/10/2019',
  	"valor": 100.00,
  	"presenca": "SIM",
  	"notaServico": 5
  }, {
  	"idEvento": 2,
  	"pet": {
  		"id": 2,
  		"nome": "lili"
  	},
    "cliente": {
      "nome": "Cliente 2"
    },
  	"responsavel": {
  		"perfil": "Veterinario",
  		"nome": "Adilson"
  	},
  	"formaPagamento": "Cartão de Crédito",
  	"servico": {
  		"descricao": "Banho"
  	},
  	"horaEvento": '20/09/2019',
  	"valor": 50.00,
  	"presenca": "SIM",
  	"notaServico": 3
  }]

export default class Servicos extends Component {
  constructor() {
    super()
    this.state = {
      servicos: SERVICOS_MOCK,
      error: '',
      startDate: new Date()
    }
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
    let data = date.toLocaleDateString();
    console.log('date ', data);
    Object.keys(SERVICOS_MOCK).sort.forEach(function(horaEvento) {
      
    });
  };

  render() {
    let { servicos, error, startDate } = this.state;
    return (
        <div>
        <span>Selecione um mês:</span>
        <DatePicker
          selected={startDate}
          onChange={this.handleChange}
          dateFormat="d/MM/yyyy"
        />
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
