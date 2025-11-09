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

  useEffect(() => setItens(getProdutos()), [])

  const selecionado = useMemo(
    () => itens.find(i => i.id === editandoId) || null,
    [itens, editandoId]
  )

  const filtrados = useMemo(() => {
    const q = filtro.trim().toLowerCase()
    if (!q) return itens
    return itens.filter(({ nome, descricao }) =>
      [nome, descricao].some(v => String(v).toLowerCase().includes(q))
    )
  }, [itens, filtro])

  const handleCreate = ({ nome, descricao }) => {
    const novo = criarProduto({ nome, descricao }) // arrow + destructuring
    setItens(getProdutos())
    setEditandoId(novo.id)
  }

  const handleUpdate = ({ nome, descricao }) => {
    if (!selecionado) return
    const atualizado = atualizarProduto({ id: selecionado.id, nome, descricao })
    if (atualizado) {
      setItens(getProdutos())
      setEditandoId(null)
    }
  }

  const requestDelete = (id) => {
    const alvo = itens.find(i => i.id === id)
    setConfirm({
      open: true,
      id,
      msg: `Tem certeza que deseja excluir o produto "${alvo?.nome}" (ID: ${id})? Essa ação não pode ser desfeita.`
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
        <div className={styles.title}>Produtos</div>
        <input
          className={styles.input}
          placeholder="Buscar por nome ou descrição…"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          style={{ maxWidth: 360 }}
        />
      </header>

      <div className={styles.grid}>
        <Formulario
          key={selecionado?.id || 'novo'}
          initialData={selecionado || undefined}
          onSubmit={selecionado ? handleUpdate : handleCreate}
          onCancel={selecionado ? () => setEditandoId(null) : undefined}
        />
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