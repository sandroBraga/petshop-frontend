import api from "./api";

export function buscarProdutos() {
  return api.get("/produtos").then(res => res.data);
}

export function gravarProdutos(produto) {
  if(produto.id) {
      return api.put("/produtos", produto);
  }
  return api.post("/produtos", produto);
}

export function excluirProdutos(produto) {
  return api.delete(`/produtos/${produto.id}`);
}
