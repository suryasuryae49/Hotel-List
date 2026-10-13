import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ConfirmModal from '../components/ConfirmModal.jsx'
import EmptyState from '../components/EmptyState.jsx'
import HotelCard from '../components/HotelCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import Pagination from '../components/Pagination.jsx'
import SearchFilter from '../components/SearchFilter.jsx'
import { deleteHotel, showToast } from '../features/hotels/hotelSlice.js'

const PAGE_SIZE = 6

function HotelList() {
  const hotels = useSelector((state) => state.hotels.hotels)
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({ search: '', minPrice: '', maxPrice: '' })
  const [appliedFilters, setAppliedFilters] = useState(filters)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pendingDelete, setPendingDelete] = useState(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredHotels = useMemo(() => {
    const search = appliedFilters.search.trim().toLowerCase()
    const min = Number(appliedFilters.minPrice)
    const max = Number(appliedFilters.maxPrice)

    return hotels.filter((hotel) => {
      const matchesSearch =
        !search ||
        hotel.title.toLowerCase().includes(search) ||
        hotel.description.toLowerCase().includes(search)
      const matchesMin = !appliedFilters.minPrice || hotel.price >= min
      const matchesMax = !appliedFilters.maxPrice || hotel.price <= max
      return matchesSearch && matchesMin && matchesMax
    })
  }, [appliedFilters, hotels])

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / PAGE_SIZE))
  const pageHotels = filteredHotels.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const start = filteredHotels.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const end = Math.min(page * PAGE_SIZE, filteredHotels.length)

  useEffect(() => {
    setPage(1)
  }, [appliedFilters])

  function applyFilter(event) {
    event.preventDefault()
    const min = Number(filters.minPrice)
    const max = Number(filters.maxPrice)

    if (filters.minPrice && filters.maxPrice && min > max) {
      dispatch(showToast({ type: 'error', message: 'Minimum price cannot exceed maximum price.' }))
      return
    }

    setAppliedFilters(filters)
  }

  function clearFilter() {
    const reset = { search: '', minPrice: '', maxPrice: '' }
    setFilters(reset)
    setAppliedFilters(reset)
  }

  function confirmDelete(id) {
    dispatch(deleteHotel(id))
    setPendingDelete(null)
  }

  const averagePrice = hotels.length
    ? Math.round(hotels.reduce((sum, hotel) => sum + Number(hotel.price), 0) / hotels.length)
    : 0

  return (
    <>
      <Helmet>
        <title>HotelHub | Manage Hotels</title>
      </Helmet>
      <section className="hero-section">
        <div className="container hero-layout">
          <div>
            <span className="eyebrow">Hotel listing and management</span>
            <h1 className="page-title">Discover & Manage Hotels</h1>
            <p className="page-copy">Explore hotels, manage listings and view locations.</p>
          </div>
          <Link className="button primary" to="/hotels/add">
            + Add Hotel
          </Link>
        </div>
      </section>

      <section className="container stats-row">
        <div>
          <span>Total hotels</span>
          <strong>{hotels.length}</strong>
        </div>
        <div>
          <span>Average price</span>
          <strong>₹{averagePrice.toLocaleString('en-IN')}</strong>
        </div>
        <div>
          <span>Visible results</span>
          <strong>{filteredHotels.length}</strong>
        </div>
      </section>

      <section className="container section">
        <SearchFilter
          filters={filters}
          onChange={(next) => setFilters((current) => ({ ...current, ...next }))}
          onApply={applyFilter}
          onClear={clearFilter}
        />

        <div className="list-heading">
          <div>
            <h2>Hotels</h2>
            <p>
              Showing {start}-{end} of {filteredHotels.length} hotels
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : pageHotels.length ? (
          <div className="hotel-grid">
            {pageHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} onDelete={setPendingDelete} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </section>

      <ConfirmModal
        hotel={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  )
}

export default HotelList
