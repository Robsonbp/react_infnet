const DialogoConfirmacao = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null
  return (
    <div className="backdrop">
      <div className="card modal">
        <h2>Confirmação</h2>
        <p className="muted">{message}</p>
        <div className="row end">
          <button className="button secondary" onClick={onCancel}>Cancelar</button>
          <button className="button danger" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  )
}

export default DialogoConfirmacao