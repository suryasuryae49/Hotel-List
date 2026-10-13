function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="pagination" aria-label="Hotel pagination">
      <button
        type="button"
        className="button secondary"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          type="button"
          className={pageNumber === page ? 'page-dot active' : 'page-dot'}
          key={pageNumber}
          aria-label={`Go to page ${pageNumber}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        className="button secondary"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
