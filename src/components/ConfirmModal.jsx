function ConfirmModal({ hotel, onCancel, onConfirm }) {
  if (!hotel) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <h2 id="delete-title">Delete hotel?</h2>
        <p>
          This will remove <strong>{hotel.title}</strong> from your listings. You can add it again
          later if needed.
        </p>
        <div className="modal-actions">
          <button type="button" className="button secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="button danger" onClick={() => onConfirm(hotel.id)}>
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
