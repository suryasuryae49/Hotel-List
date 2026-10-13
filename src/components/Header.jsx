import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/hotels" onClick={() => setOpen(false)}>
          <span className="brand-mark">H</span>
          <span>HotelHub</span>
        </NavLink>
        <button
          type="button"
          className="icon-button menu-button"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'X' : '☰'}
        </button>
        <nav className={open ? 'header-nav open' : 'header-nav'} aria-label="Primary navigation">
          <NavLink to="/hotels" onClick={() => setOpen(false)}>
            Hotels
          </NavLink>
          <NavLink className="button primary" to="/hotels/add" onClick={() => setOpen(false)}>
            + Add Hotel
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
