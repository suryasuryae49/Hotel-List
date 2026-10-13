import { Helmet } from 'react-helmet-async'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HotelForm from '../components/HotelForm.jsx'
import { addHotel } from '../features/hotels/hotelSlice.js'

function AddHotel() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(values) {
    dispatch(addHotel(values))
    navigate('/hotels')
  }

  return (
    <>
      <Helmet>
        <title>Add Hotel | HotelHub</title>
      </Helmet>
      <section className="container section form-page">
        <span className="eyebrow">Create listing</span>
        <h1 className="page-title">Add Hotel</h1>
        <p className="page-copy">Add images, prices, and exact map coordinates for a new stay.</p>
        <HotelForm submitLabel="Save Hotel" onSubmit={handleSubmit} />
      </section>
    </>
  )
}

export default AddHotel
