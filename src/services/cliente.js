import api from "./api";

export function buscarClientes() {
  return api.get("/clientes").then(res => res.data);
}

export function gravarClientes(cliente) {
  if(cliente.id) {
      return api.put("/clientes", cliente);
  }
  return api.post("/clientes", cliente);
}

export function excluirClientes(cliente) {
  return api.delete(`/clientes/${cliente.id}`);
}
