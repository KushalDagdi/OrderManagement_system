function OrderControls({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  bulkUpdate,
  exportCSV,
  exportJSON
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">

      {/* SEARCH */}
      <input
        placeholder="Search by ID or Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-slate-800 border border-slate-600 px-3 py-2 rounded"
      />

      {/* FILTER */}
      <select
        onChange={(e) => setStatus(e.target.value)}
        className="bg-slate-800 border border-slate-600 px-3 py-2 rounded"
      >
        <option value="">All Status</option>
        <option>Pending</option>
        <option>Shipped</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      {/* SORT */}
      <select
        onChange={(e) => setSort(e.target.value)}
        className="bg-slate-800 border border-slate-600 px-3 py-2 rounded"
      >
        <option value="">Sort</option>
        <option value="amount_desc">Amount ↓</option>
        <option value="date_desc">Date ↓</option>
      </select>

      {/* BULK STATUS */}
      <select
        onChange={(e) => bulkUpdate(e.target.value)}
        className="bg-slate-800 border border-slate-600 px-3 py-2 rounded"
      >
        <option value="">Bulk Update</option>
        <option>Pending</option>
        <option>Shipped</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      {/* EXPORT */}
      <button
        onClick={exportCSV}
        className="border border-green-500 px-3 py-2 rounded hover:bg-green-500"
      >
        CSV
      </button>

      <button
        onClick={exportJSON}
        className="border border-purple-500 px-3 py-2 rounded hover:bg-purple-500"
      >
        JSON
      </button>

    </div>
  );
}

export default OrderControls;