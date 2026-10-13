function SearchFilter({ filters, onChange, onApply, onClear }) {
  return (
    <form className="filter-panel" onSubmit={onApply}>
      <div className="field search-field">
        <label htmlFor="search">Search hotels</label>
        <input
          id="search"
          type="search"
          placeholder="Search hotels..."
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="minPrice">Minimum Price</label>
        <input
          id="minPrice"
          min="0"
          type="number"
          placeholder="₹ Min"
          value={filters.minPrice}
          onChange={(event) => onChange({ minPrice: event.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="maxPrice">Maximum Price</label>
        <input
          id="maxPrice"
          min="0"
          type="number"
          placeholder="₹ Max"
          value={filters.maxPrice}
          onChange={(event) => onChange({ maxPrice: event.target.value })}
        />
      </div>
      <div className="filter-actions">
        <button className="button primary" type="submit">
          Apply Filter
        </button>
        <button className="button secondary" type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    </form>
  )
}

export default SearchFilter
