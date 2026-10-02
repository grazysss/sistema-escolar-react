import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import BarraNavegacao from "./components/BarraNavegacao";
import MensagemErro from "./components/MensagemErro";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaListagemProfessor from "./pages/PaginaListagem";
import PaginaListagem from "./pages/PaginaCadastroProfessor" // adicionado agora
import PaginaCadastro from "./pages/PaginaCadastro";
import PaginaCadastroProfessor from "./pages/PaginaCadastroProfessor" // adicionado agora
import { listarAlunos, criarAluno, excluirAluno } from "./services/alunoService";
import { listarProfessores, criarProfessor, excluirProfessor } from "./services/professorService" // importando funções de professorService

const mensagemConexao = "Não foi possível conectar à API. Você esqueceu de iniciar o json-server? Rode: npx json-server --watch db.json --port 3000";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([])
  const [erro, setErro] = useState("");

  useEffect(function () {
    carregarAlunos();
    carregarProfessor(); 
  }, []);

  async function carregarAlunos() {
    try {
      const dados = await listarAlunos();
      setAlunos(dados);
      setErro("");
    } catch (e) {
      setErro(mensagemConexao);
    }
  }

  // função de redenrizar a lista de professores
  async function carregarProfessor() {
    try {
      const dados = await listarProfessores();
      setProfessores(dados);
      setErro("")
    } catch (e) {
      setErro(mensagemConexao)
    }
  }

  async function aoSalvar(aluno) {
    try {
      await criarAluno(aluno);
      carregarAlunos();
    } catch (e) {
      setErro(mensagemConexao);
    }
  }

  async function aoSalvar(professor) {
    try {
      await criarProfessor(professor)
      carregarProfessores()
    } catch (e) {
      setErro(mensagemConexao)
    }
  }

  async function aoExcluir(id) {
    try {
      await excluirAluno(id);
      carregarAlunos();
    } catch (e) {
      setErro(mensagemConexao);
    }
  }

  async function aoExcluir(id) {
    try {
      await excluirProfessor(id)
      carregarAlunos()
    } catch (e) {
      setErro(mensagemConexao)
    }
  }

  return (
    <div className="App">
      <header className="cabecalho-ifrn">
        <img
          src="/IFRN.png"
          alt="Logo IFRN"
          className="logo-ifrn"
          onError={function (e) { e.target.style.display = "none"; }}
        />
        <h1>Sistema Escolar — Cadastro de Alunos</h1>
      </header>
      <BarraNavegacao />
      <MensagemErro mensagem={erro} />
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/alunos" element={<PaginaListagem alunos={alunos} aoExcluir={aoExcluir} />} />
        <Route path="/professores" element={<PaginaListagemProfessor professores={professores} aoExcluir={aoExcluir} />} />
        <Route path="/cadastraraluno" element={<PaginaCadastro aoSalvar={aoSalvar} />} />
        <Route path="/cadastrarprofessor" element={<PaginaCadastroProfessor aoSalvar={aoSalvar} />} />
      </Routes>
    </div>
  );
}

export default App;
