import { Link } from 'react-router-dom'

function EmptyState({ title = 'No hotels found', message = 'Try changing your search or filters.' }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">⌂</div>
      <h2>{title}</h2>
      <p>{message}</p>
      <Link className="button primary" to="/hotels/add">
        Add Hotel
      </Link>
    </div>
  )
}

export default EmptyState
