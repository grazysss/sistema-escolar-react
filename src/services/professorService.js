import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Método para listar todos os professores - Get
export async function listarProfessores() {
  const resposta = await api.get("/professor");
  return resposta.data;
}

// Método para criar um novo professor - Post
export async function criarProfessor(professor) {
  const resposta = await api.post("/professor", professor);
  return resposta.data;
}

// Método para excluir um professor - Delete
export async function excluirProfessor(id) {
  await api.delete("/professor/" + id);
}
