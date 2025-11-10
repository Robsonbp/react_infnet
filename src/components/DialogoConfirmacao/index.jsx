import styles from './style.module.css'

const DialogoConfirmacao = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null
  return (
    <div className={styles.backdrop}>
      <div className={`${styles.card} ${styles.modal}`}>
        <h2 className={styles.title}>Confirmação</h2>
        <p className={styles.muted}>{message}</p>
        <div className={styles.row}>
          <button className={`${styles.button} ${styles.cancelar}`} onClick={onCancel}>Cancelar</button>
          <button className={`${styles.button} ${styles.confirmar}`} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  )
}

export default DialogoConfirmacao