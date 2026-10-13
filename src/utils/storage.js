const STORAGE_KEY = 'hotelhub_hotels'

export function loadHotels(fallback) {
  try {
    const savedHotels = localStorage.getItem(STORAGE_KEY)
    return savedHotels ? JSON.parse(savedHotels) : fallback
  } catch {
    return fallback
  }
}

export function saveHotels(hotels) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels))
}
