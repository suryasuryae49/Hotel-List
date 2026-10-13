const MAX_IMAGE_SIZE = 2.5 * 1024 * 1024
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function validateHotel(values) {
  const errors = {}
  const title = values.title.trim()
  const description = values.description.trim()
  const latitude = Number(values.latitude)
  const longitude = Number(values.longitude)
  const price = Number(values.price)

  if (title.length < 3) {
    errors.title = 'Hotel title must contain at least 3 characters.'
  } else if (title.length > 100) {
    errors.title = 'Hotel title cannot exceed 100 characters.'
  }

  if (description.length < 20) {
    errors.description = 'Description must contain at least 20 characters.'
  } else if (description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters.'
  }

  if (values.latitude === '' || Number.isNaN(latitude) || latitude < -90 || latitude > 90) {
    errors.latitude = 'Latitude must be between -90 and 90.'
  }

  if (values.longitude === '' || Number.isNaN(longitude) || longitude < -180 || longitude > 180) {
    errors.longitude = 'Longitude must be between -180 and 180.'
  }

  if (values.price === '' || Number.isNaN(price) || price <= 0) {
    errors.price = 'Price must be greater than 0.'
  } else if (price > 100000) {
    errors.price = 'Price must be below ₹100,000 per night.'
  }

  return errors
}

export function validateImage(file) {
  if (!IMAGE_TYPES.includes(file.type)) {
    return 'Please upload a JPG, PNG, or WEBP image.'
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return 'Image size should be less than 2.5 MB.'
  }

  return ''
}
