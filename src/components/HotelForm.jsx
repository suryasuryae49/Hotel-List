import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateHotel, validateImage } from '../utils/validation.js'

const emptyHotel = {
  image: '',
  title: '',
  description: '',
  latitude: '',
  longitude: '',
  price: '',
}

function HotelForm({ initialValue, submitLabel, onSubmit }) {
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const [values, setValues] = useState({ ...emptyHotel, ...initialValue })
  const [errors, setErrors] = useState({})

  const descriptionCount = useMemo(() => values.description.length, [values.description])

  function updateField(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleImage(event) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const imageError = validateImage(file)
    if (imageError) {
      setErrors((current) => ({ ...current, image: imageError }))
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      updateField('image', reader.result)
      setErrors((current) => ({ ...current, image: '' }))
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateHotel(values)

    if (!values.image) {
      nextErrors.image = 'Please upload a hotel image.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
    })
  }

  return (
    <form className="hotel-form" onSubmit={handleSubmit}>
      <section className="form-card image-uploader">
        <input
          ref={fileRef}
          id="hotelImage"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImage}
          hidden
        />
        {values.image ? (
          <div className="preview-block">
            <img src={values.image} alt={values.title || 'Hotel preview'} />
            <div className="upload-actions">
              <button type="button" className="button secondary" onClick={() => fileRef.current.click()}>
                Change Image
              </button>
              <button type="button" className="button danger" onClick={() => updateField('image', '')}>
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="upload-dropzone"
            onClick={() => fileRef.current.click()}
            aria-label="Upload hotel image"
          >
            <span className="upload-icon">▣</span>
            <strong>Upload Hotel Image</strong>
            <span>Click to upload JPG, PNG, or WEBP</span>
          </button>
        )}
        {errors.image ? <p className="error-text">{errors.image}</p> : null}
      </section>

      <section className="form-card form-grid">
        <div className="field">
          <label htmlFor="title">Hotel title</label>
          <input
            id="title"
            value={values.title}
            maxLength="100"
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Hotel Grand Palace"
          />
          {errors.title ? <p className="error-text">{errors.title}</p> : null}
        </div>

        <div className="field full">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={values.description}
            maxLength="500"
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Describe the stay, amenities, location, and guest experience."
          />
          <span className="meta-text">{descriptionCount} / 500</span>
          {errors.description ? <p className="error-text">{errors.description}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="latitude">Latitude</label>
          <input
            id="latitude"
            type="number"
            step="any"
            value={values.latitude}
            onChange={(event) => updateField('latitude', event.target.value)}
            placeholder="11.0168"
          />
          {errors.latitude ? <p className="error-text">{errors.latitude}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="longitude">Longitude</label>
          <input
            id="longitude"
            type="number"
            step="any"
            value={values.longitude}
            onChange={(event) => updateField('longitude', event.target.value)}
            placeholder="76.9558"
          />
          {errors.longitude ? <p className="error-text">{errors.longitude}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="price">Price per night</label>
          <input
            id="price"
            type="number"
            min="1"
            step="0.01"
            value={values.price}
            onChange={(event) => updateField('price', event.target.value)}
            placeholder="4500"
          />
          {errors.price ? <p className="error-text">{errors.price}</p> : null}
        </div>

        <div className="form-actions full">
          <button type="button" className="button secondary" onClick={() => navigate('/hotels')}>
            Cancel
          </button>
          <button type="submit" className="button primary">
            {submitLabel}
          </button>
        </div>
      </section>
    </form>
  )
}

export default HotelForm
