export const TOKEN_KEY = "@petshop-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isAdmin = () => JSON.parse(localStorage.getItem("usuario_logado")).id_perfil === 4;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
