import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import HotelMap from '../components/HotelMap.jsx'

function HotelDetail() {
  const { id } = useParams()
  const hotel = useSelector((state) => state.hotels.hotels.find((item) => item.id === id))

  if (!hotel) {
    return (
      <section className="container section">
        <EmptyState title="Hotel not found" message="The requested listing does not exist." />
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>{hotel.title} | HotelHub</title>
      </Helmet>
      <section className="container section detail-page">
        <div className="detail-hero">
          <img src={hotel.image} alt={hotel.title} />
          <div className="detail-summary">
            <span className="eyebrow">Hotel details</span>
            <h1 className="page-title">{hotel.title}</h1>
            <p>{hotel.description}</p>
            <div className="detail-stats">
              <div>
                <span>Rating</span>
                <strong>★ {hotel.rating?.toFixed(1) || '4.5'}</strong>
              </div>
              <div>
                <span>Price</span>
                <strong>₹{Number(hotel.price).toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span>Coordinates</span>
                <strong>
                  {hotel.latitude.toFixed(4)}, {hotel.longitude.toFixed(4)}
                </strong>
              </div>
            </div>
            <div className="detail-actions">
              <Link className="button secondary" to="/hotels">
                Back to Hotels
              </Link>
              <Link className="button primary" to={`/hotels/${hotel.id}/edit`}>
                Edit Hotel
              </Link>
            </div>
          </div>
        </div>
        <section className="map-section">
          <div>
            <h2>Location</h2>
            <p>OpenStreetMap location based on this hotel’s latitude and longitude.</p>
          </div>
          <HotelMap hotel={hotel} />
        </section>
      </section>
    </>
  )
}

export default HotelDetail
