import { configureStore } from '@reduxjs/toolkit'
import hotelReducer from '../features/hotels/hotelSlice.js'
import { saveHotels } from '../utils/storage.js'

export const store = configureStore({
  reducer: {
    hotels: hotelReducer,
  },
})

store.subscribe(() => {
  saveHotels(store.getState().hotels.hotels)
})
