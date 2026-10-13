import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import HotelForm from '../components/HotelForm.jsx'
import { updateHotel } from '../features/hotels/hotelSlice.js'

function EditHotel() {
  const { id } = useParams()
  const hotel = useSelector((state) => state.hotels.hotels.find((item) => item.id === id))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!hotel) {
    return (
      <section className="container section">
        <EmptyState title="Hotel not found" message="This hotel may have been deleted." />
      </section>
    )
  }

  function handleSubmit(values) {
    dispatch(updateHotel({ ...values, id }))
    navigate(`/hotels/${id}`)
  }

  return (
    <>
      <Helmet>
        <title>Edit {hotel.title} | HotelHub</title>
      </Helmet>
      <section className="container section form-page">
        <span className="eyebrow">Update listing</span>
        <h1 className="page-title">Edit Hotel</h1>
        <p className="page-copy">Keep listing details accurate for guests and managers.</p>
        <HotelForm initialValue={hotel} submitLabel="Update Hotel" onSubmit={handleSubmit} />
      </section>
    </>
  )
}

export default EditHotel
