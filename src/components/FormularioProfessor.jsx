import { useState } from "react";
import CampoTexto from "./CampoTexto";

function FormularioProfessor(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [dataadmissao, setDataadmissao] = useState("");

  function aoEnviar(e) {
    e.preventDefault();
    const professor = {
      nome: nome,
      email: email,
      cpf: cpf,
      disciplina: disciplina,
      dataadmissao: dataadmissao
    };
    props.aoSalvar(professores);
    setNome("");
    setEmail("");
    setCpf("");
    setDisciplina("");
    setDataadmissao("");
  }

  return (
    <form className="formulario-professor" onSubmit={aoEnviar}>
      <CampoTexto rotulo="Nome" valor={nome} aoAlterar={setNome} />
      <CampoTexto rotulo="Email" tipo="email" valor={email} aoAlterar={setEmail} />
      <CampoTexto rotulo="CPF" valor={cpf} aoAlterar={setCpf} />
      <CampoTexto rotulo="Disciplina" valor={disciplina} aoAlterar={setDisciplina} />
      <CampoTexto rotulo="Data de Admissão" tipo="date" valor={dataadmissao} aoAlterar={setDataadmissao} />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default FormularioProfessor;
