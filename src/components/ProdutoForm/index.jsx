import { useEffect, useState } from 'react'
import styles from './style.module.css'

const vazio = { body: '', title: '', userId: '' }

const ProdutoForm = ({ conteudoInicial = vazio, onSubmit, onCancel }) => {
  const [form, setForm] = useState(conteudoInicial)

  useEffect(() => setForm(conteudoInicial), [conteudoInicial])

  const handleChange = ({ target: { name, value } }) =>
    setForm(prev => ({ ...prev, [name]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { body, title, userId } = form
    if (!body.trim() || !title.trim() || !userId.trim()) return
    onSubmit({ body: body.trim(), title: title.trim(), userId: parseInt(userId.trim()) })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{conteudoInicial?.id ? 'Editar post' : 'Novo post'}</h2>
      <div className={styles.stack}>
        <input
          className={styles.input}
          name="body"
          placeholder="Body"
          value={form.body}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          name="userId"
          placeholder="User Id"
          value={form.userId}
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