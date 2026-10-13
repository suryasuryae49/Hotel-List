import { Link, useNavigate } from 'react-router-dom'

function HotelCard({ hotel, onDelete }) {
  const navigate = useNavigate()

  return (
    <article className="hotel-card" onClick={() => navigate(`/hotels/${hotel.id}`)}>
      <div className="hotel-image-wrap">
        <img src={hotel.image} alt={hotel.title} className="hotel-image" />
        <span className="rating-badge">★ {hotel.rating?.toFixed(1) || '4.5'}</span>
      </div>
      <div className="hotel-card-body">
        <div>
          <h3>{hotel.title}</h3>
          <p>{hotel.description}</p>
        </div>
        <div className="hotel-meta">
          <strong>₹{Number(hotel.price).toLocaleString('en-IN')}</strong>
          <span>/ night</span>
        </div>
        <div className="coordinates">
          {hotel.latitude.toFixed(4)}, {hotel.longitude.toFixed(4)}
        </div>
        <div className="card-actions" onClick={(event) => event.stopPropagation()}>
          <Link className="button secondary" to={`/hotels/${hotel.id}`}>
            View
          </Link>
          <Link className="button secondary" to={`/hotels/${hotel.id}/edit`}>
            Edit
          </Link>
          <button type="button" className="button danger" onClick={() => onDelete(hotel)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default HotelCard
