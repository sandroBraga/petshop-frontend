import React, { Component } from 'react';
import {Input, Label, Form, Button} from '../../components/form';
import {Table,Tr,} from 'styled-table-component';
import * as produtoService from '../../services/produto';

const NOVO_PRODUTO = {
  nome: '',
  fabricante: '',
  qtde_estoque: '',
  especificacoes: '',
  valor_real: '',
  valor_pataz: ''
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
    .then((produtos) => this.setState({produtos: produtos, produtosBkp: produtos})
    ).catch(err => {
      this.setState({error: JSON.stringify(err)});
    });
  }

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      produto: {
        ...this.state.produto,
        [name]: value
      }
    });
  }

  procurarProduto = (e) => {
    let produtosFiltrados = [];
    const { produtos } = this.state;
    if(e.target.value !== "") {
      produtosFiltrados = produtos.filter(p => p.nome.includes(e.target.value));
    } else {
      produtosFiltrados = this.state.produtosBkp;
    }
    this.setState({produtos: produtosFiltrados});
  }

  gravar = () => {
    let {produtos, produto} = this.state;
    if(produto.nome === "" || produto.fabricante === "" || produto.qtde_estoque === "" || produto.especificacoes === "" || produto.valor_real === "" || produto.valor_pataz === "") {
      this.setState({error: "Todos os campos são obrigatórios"});
      return;
    }
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
          produtos: produtos,
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
        this.setState({produtos: produtos.filter(p => produto.id !== p.id)});
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
        <br />
        <hr />
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
              <Label>Qtde Estoque:</Label>
              <Input type="number" name="qtde_estoque" onChange={this.handleInputChange} value={produto.qtde_estoque}/>
            </div>
            <div>
              <Label>Especificações:</Label>
              <Input type="text" name="especificacoes" onChange={this.handleInputChange} value={produto.especificacoes} />
            </div>
            <div>
              <Label>Valor Real:</Label>
              <Input type="number" name="valor_real" onChange={this.handleInputChange} value={produto.valor_real} />
            </div>
            <div>
              <Label>Valor Pataz:</Label>
              <Input type="number" name="valor_pataz" onChange={this.handleInputChange} value={produto.valor_pataz} />
            </div>

            <Button onClick={this.gravar} >Salvar</Button>
          </Form>
          <br />
          <hr />
          <div>
            <Label>Pesquisar:</Label>
            <Input type="text" name="produtoFinder" onChange={this.procurarProduto} placeholder="Nome do Produto"/>
            <hr />
          </div>
          <div>
            <Table>
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Fabricante</th>
                  <th scope="col">Quantidade Estoque</th>
                  <th scope="col">Especificações</th>
                  <th scope="col">Valor Real</th>
                  <th scope="col">Valor Pataz</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>
              <tbody>
              {produtos.map((p) => {
                return(
                  <Tr active key={p.id}>
                    <td>{p.nome}</td>
                    <td>{p.fabricante}</td>
                    <td>{p.qtde_estoque}</td>
                    <td>{p.especificacoes}</td>
                    <td>{p.valor_real}</td>
                    <td>{p.valor_pataz}</td>
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
