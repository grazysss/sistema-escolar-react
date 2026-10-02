import { Link } from "react-router-dom";

function BarraNavegacao() {
  return (
    <nav className="barra-navegacao">
      <Link to="/">Início</Link>
      <Link to="/alunos">Alunos</Link>
      <Link to="/professores">Professores</Link>
      <Link to="/cadastroaluno">Cadastrar Alunos</Link>
      <Link to="/cadastroprofessor">Cadastrar professores</Link>
    </nav>
  );
}

export default BarraNavegacao;
