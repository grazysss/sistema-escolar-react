import CardProfessor from "./CardProfessor";

function ListaProfessores(props) {
  const cards = [];

  for (let i = 0; i < props.professor.length; i++) {
    const professor = props.professor[i];
    cards.push(
      <CardProfessor
        key={professor.id}
        aluno={professor}
        aoExcluir={props.aoExcluir}
      />
    );
  }

  return (
    <div className="lista-professores">
      {cards}
    </div>
  );
}

export default ListaProfessores;
