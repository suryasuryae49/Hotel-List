import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearToast } from '../features/hotels/hotelSlice.js'

function Toast() {
  const toast = useSelector((state) => state.hotels.toast)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timer = window.setTimeout(() => dispatch(clearToast()), 2600)
    return () => window.clearTimeout(timer)
  }, [dispatch, toast])

  if (!toast) {
    return null
  }

  return (
    <div className={`toast ${toast.type}`} role="status" aria-live="polite">
      {toast.message}
    </div>
  )
}

export default Toast
