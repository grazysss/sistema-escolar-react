import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import BarraNavegacao from "./components/BarraNavegacao";
import MensagemErro from "./components/MensagemErro";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaListagemAlunos from "./pages/PaginaListagemAlunos";
import PaginaListagemProfessores from "./pages/PaginaListagemProfessores" // adicionado agora
import PaginaCadastroAluno from "./pages/PaginaCadastroAluno";
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
    carregarProfessores(); 
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
  async function carregarProfessores() {
    try {
      const dados = await listarProfessores();
      setProfessores(dados);
      setErro("")
    } catch (e) {
      setErro(mensagemConexao)
    }
  }

  async function aoSalvarAluno(aluno) {
    try {
      await criarAluno(aluno);
      carregarAlunos();
    } catch (e) {
      setErro(mensagemConexao);
    }
  }

  async function aoSalvarProfessor(professor) {
    try {
      await criarProfessor(professor)
      carregarProfessores()
    } catch (e) {
      setErro(mensagemConexao)
    }
  }

  async function aoExcluirAluno(id) {
    try {
      await excluirAluno(id);
      carregarAlunos();
    } catch (e) {
      setErro(mensagemConexao);
    }
  }

  async function aoExcluirProfessor(id) {
    try {
      await excluirProfessor(id)
      carregarProfessores()
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
        <Route path="/alunos" element={<PaginaListagemAlunos alunos={alunos} aoExcluir={aoExcluirAluno} />} />
        <Route path="/professores" element={<PaginaListagemProfessores professores={professores} aoExcluir={aoExcluirProfessor} />} />
        <Route path="/cadastroaluno" element={<PaginaCadastroAluno aoSalvar={aoSalvarAluno} />} />
        <Route path="/cadastroprofessor" element={<PaginaCadastroProfessor aoSalvar={aoSalvarProfessor} />} />
      </Routes>
    </div>
  );
}

export default App;
