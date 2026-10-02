function CardProfessor(props) {
    return (
        <div className="card-professor">
            <h3>{props.professor.nome}</h3>
            <p>{props.professor.email}</p>
            <p>{props.professor.cpf}</p>
            <p>{props.professor.disciplina}</p>
            <p>{props.professor.dataadmissao}</p>
            <button onClick={function () {props.aoExcluir(props.aluno.id);}}>Excluir</button>
        </div>
    )
}

export default CardProfessor