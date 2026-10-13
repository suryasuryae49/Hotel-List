import { createSlice, nanoid } from '@reduxjs/toolkit'
import { initialHotels } from '../../data/hotels.js'
import { loadHotels } from '../../utils/storage.js'

const initialState = {
  hotels: loadHotels(initialHotels),
  toast: null,
}

const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    addHotel: {
      reducer(state, action) {
        state.hotels.unshift(action.payload)
        state.toast = { id: Date.now(), type: 'success', message: 'Hotel added successfully.' }
      },
      prepare(hotel) {
        return {
          payload: {
            ...hotel,
            id: nanoid(),
            rating: Number(hotel.rating || 4.5),
            latitude: Number(hotel.latitude),
            longitude: Number(hotel.longitude),
            price: Number(hotel.price),
          },
        }
      },
    },
    updateHotel(state, action) {
      const index = state.hotels.findIndex((hotel) => hotel.id === action.payload.id)
      if (index >= 0) {
        state.hotels[index] = {
          ...state.hotels[index],
          ...action.payload,
          latitude: Number(action.payload.latitude),
          longitude: Number(action.payload.longitude),
          price: Number(action.payload.price),
        }
        state.toast = { id: Date.now(), type: 'success', message: 'Hotel updated successfully.' }
      }
    },
    deleteHotel(state, action) {
      state.hotels = state.hotels.filter((hotel) => hotel.id !== action.payload)
      state.toast = { id: Date.now(), type: 'success', message: 'Hotel deleted.' }
    },
    showToast(state, action) {
      state.toast = { id: Date.now(), ...action.payload }
    },
    clearToast(state) {
      state.toast = null
    },
  },
})

export const { addHotel, clearToast, deleteHotel, showToast, updateHotel } = hotelSlice.actions
export default hotelSlice.reducer
