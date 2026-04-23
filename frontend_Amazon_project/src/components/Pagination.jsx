function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="mt-4">
      <button onClick={() => setPage(page - 1)}>Prev</button>
      <span> {page} </span>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default Pagination;