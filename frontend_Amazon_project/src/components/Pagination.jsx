function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded disabled:bg-gray-500"
      >
        Prev
      </button>

      <span className="text-lg font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded disabled:bg-gray-500"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;