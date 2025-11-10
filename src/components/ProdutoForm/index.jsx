import { useEffect, useState } from 'react'
import styles from './style.module.css'

const vazio = { nome: '', descricao: '' }

const ProdutoForm = ({ conteudoInicial = vazio, onSubmit, onCancel }) => {
  const [form, setForm] = useState(conteudoInicial)

  useEffect(() => setForm(conteudoInicial), [conteudoInicial])

  const handleChange = ({ target: { name, value } }) =>
    setForm(prev => ({ ...prev, [name]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { nome, descricao } = form // destructuring
    if (!nome.trim() || !descricao.trim()) return
    onSubmit({ nome: nome.trim(), descricao: descricao.trim() })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{conteudoInicial?.id ? 'Editar produto' : 'Novo produto'}</h2>
      <div className={styles.stack}>
        <input
          className={styles.input}
          name="nome"
          placeholder="Nome do produto"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
        />
        <div className={styles.actions}>
          {onCancel && (
            <button type="button" className={styles.buttom} onClick={onCancel}>
              Cancelar
            </button>
          )}
          <button className={styles.buttom} type="submit">
            Salvar
          </button>
        </div>
      </div>
    </form>
  )
}

export default ProdutoForm