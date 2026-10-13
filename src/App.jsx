import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Toast from './components/Toast.jsx'
import AddHotel from './pages/AddHotel.jsx'
import EditHotel from './pages/EditHotel.jsx'
import HotelDetail from './pages/HotelDetail.jsx'
import HotelList from './pages/HotelList.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/hotels" replace />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotels/add" element={<AddHotel />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/hotels/:id/edit" element={<EditHotel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toast />
    </div>
  )
}

export default App
