import { useEffect, useMemo, useState } from 'react'
import { getProdutos, criarProduto, atualizarProduto, deletarProduto } from '../../services/produtoService'
import Formulario from '../../components/ProdutoForm'
import Tabela from '../../components/ProdutoTabela'
import DialogoConfirmacao from '../../components/DialogoConfirmacao'
import styles from './style.module.css'

const ProdutoPage = () => {
  const [itens, setItens] = useState([])
  const [filtro, setFiltro] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [confirm, setConfirm] = useState({ open: false, id: null, msg: '' })

  useEffect(() => {
    getProdutos().then((dados) => setItens(dados))
  }, [])

  const selecionado = useMemo(
    () => itens.find(i => i.id === editandoId) || null,
    [itens, editandoId]
  )

  const filtrados = useMemo(() => {
    const q = filtro.trim().toLowerCase()
    if (!q) return itens
    return itens.filter(({ userId, id, title, body }) =>
      [userId, id, title, body].some(v => String(v).toLowerCase().includes(q))
    )
  }, [itens, filtro])

  const handleCreate = async ({ userId, id, title, body }) => {
    const novo = criarProduto({ userId, id, title, body })
    posts = await getProdutos()
    setItens(posts)
  }

  const handleUpdate = async ({ userId, id, title, body }) => {
    if (!selecionado) return
    const atualizado = atualizarProduto({ id: selecionado.id, userId, id, title, body })
    if (atualizado) {
      posts = await getProdutos()
      setItens(posts)
      setEditandoId(null)
    }
  }

  const requestDelete = (id) => {
    const alvo = itens.find(i => i.id === id)
    setConfirm({
      open: true,
      id,
      msg: `Tem certeza que deseja excluir o post "${alvo?.title}" (ID: ${id})? Essa ação não pode ser desfeita.`
    })
  }

  const confirmDelete = () => {
    if (deletarProduto(confirm.id)) {
      setItens(getProdutos())
      if (editandoId === confirm.id) setEditandoId(null)
    }
    setConfirm({ open: false, id: null, msg: '' })
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>Posts</div>
        <input
          className={styles.input}
          placeholder="Buscar..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          style={{ maxWidth: 360 }}
        />
      </header>

      <div className={styles.flex}>
        <Formulario
          key={selecionado?.id || 'novo'}
          conteudoInicial={selecionado || undefined}
          onSubmit={selecionado ? handleUpdate : handleCreate}
          onCancel={selecionado ? () => setEditandoId(null) : undefined}
        />
      </div>

      <div className={styles.flex}>
        <Tabela
          itens={filtrados}
          onEdit={id => setEditandoId(id)}
          onDelete={requestDelete}
        />
      </div>

      <DialogoConfirmacao
        open={confirm.open}
        message={confirm.msg}
        onConfirm={confirmDelete}
        onCancel={() => setConfirm({ open: false, id: null, msg: '' })}
      />

    </div>
  )
}

export default ProdutoPage