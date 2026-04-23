function Pagination({ page, totalPages, setPage }) {
  return (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>

      <span> Page {page} of {totalPages} </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;