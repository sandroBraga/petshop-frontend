import React, { Component } from 'react';
import {Input, Label, Form, Button} from '../../components/form';
import {Table,Tr,} from 'styled-table-component';
import * as produtoService from '../../services/produto';

const NOVO_PRODUTO = {
  nome: '',
  fabricante: '',
  especificacoes: ''
}

export default class Produtos extends Component {
  constructor() {
    super()
    this.state = {
      produto: NOVO_PRODUTO,
      produtos: [],
      error: ''
    }
  }

  componentDidMount() {
    produtoService.buscarProdutos()
    .then((produtos) => this.setState({produtos: produtos})
    ).catch(err => {
      this.setState({error: JSON.stringify(err)});
    });
  }

  handleInputChange = (e) => {
    const {name, value} = e.target
    this.setState({
      cliente: {
        ...this.state.produto,
        [name]: value
      }
    });
  }

  gravar = () => {
    let {produtos, produto} = this.state;
    produtoService.gravarProdutos(produto)
      .then(() => {
        if(produto.id) {
          produtos = produtos.map(p => {
            if(produto.id === p.id) {
              return produto;
            }
            return p;
          });
        } else {
          produtos.push(produto);
        }
        this.setState({
          produtos: produto,
          produto: NOVO_PRODUTO
        });
      }).catch(err => {
        console.error('Error ', err);
        this.setState({produto: NOVO_PRODUTO, error: JSON.stringify(err)});
      });
  }

  editar = (c) => {
    this.setState({produto: c});
  }

  excluir = (produto) => {
    let {produtos} = this.state;
    produtoService.excluirProdutos(produto)
      .then(() => {
        this.setState({produtos: produtos.filter(c => produtos.id !== c.id)});
      }).catch(err => {
        console.error('Error ', err);
        this.setState({error: JSON.stringify(err)});
      })
  }

  render() {
    let { produto, produtos, error } = this.state;
    return (
        <div>
        <div> { error } </div>
          <Form>
            <div>
              <Label>Nome:</Label>
              <Input type="text" name="nome"  onChange={this.handleInputChange} value={produto.nome} />
            </div>
            <div>
              <Label>Fabricante:</Label>
              <Input type="text" name="fabricante" onChange={this.handleInputChange} value={produto.fabricante} />
            </div>
            <div>
              <Label>Especificações:</Label>
              <Input type="text" name="especificacoes" onChange={this.handleInputChange} value={produto.especificacoes} />
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
                  <th scope="col">Fabricante</th>
                  <th scope="col">Especificações</th>
                </tr>
              </thead>
              <tbody>
              {produtos.map((p) => {
                return(
                  <Tr active key={p.id}>
                    <td>{p.nome}</td>
                    <td>{p.fabricante}</td>
                    <td>{p.especificacoes}</td>
                    <td><Button onClick={() => this.editar(p)}>Editar</Button></td>
                    <td><Button onClick={() => this.excluir(p)}>Excluir</Button></td>
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
