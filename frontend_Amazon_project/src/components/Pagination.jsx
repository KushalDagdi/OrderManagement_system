function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="mt-4 flex gap-3 justify-center">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="border px-4 py-1 rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span>{page} / {totalPages}</span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="border px-4 py-1 rounded disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;