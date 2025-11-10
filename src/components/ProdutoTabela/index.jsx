import styles from './style.module.css'

const ProdutoTabela = ({ itens = [], onEdit, onDelete }) => {
  if (!itens.length) return <div className="card empty">Nenhum produto cadastrado.</div>

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Produtos</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.title}>
            <th>Id</th>
            <th>Body</th>
            <th>Title</th>
            <th>User Id</th>
            <th style={{ width: 180 }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map(({ id, body, title, userId }) => (
            <tr className={styles.body} key={id}>
              <td>{id}</td>
              <td>{body}</td>
              <td>{title}</td>
              <td>{userId}</td>
              <td>
                <div className={styles.row}>
                  <button className={styles.button} onClick={() => onEdit(id)}>Editar</button>
                  <button className={styles.button} onClick={() => onDelete(id)}>
                    {`Excluir`}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProdutoTabela