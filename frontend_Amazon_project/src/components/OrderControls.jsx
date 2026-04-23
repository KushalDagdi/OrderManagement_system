function OrderControls({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  selectedIds,
  bulkUpdate,
  exportCSV,
  exportJSON
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">

      {/*  SEARCH */}
      <input
        placeholder="Search Order ID / Customer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-slate-800 p-2"
      />

      {/*  STATUS FILTER */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-slate-800 p-2"
      >
        <option value="">All Status</option>
        <option>Pending</option>
        <option>Shipped</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      {/*  SORT */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-slate-800 p-2"
      >
        <option value="">Sort</option>
        <option value="amount_desc">Amount High → Low</option>
        <option value="date_desc">Latest First</option>
      </select>

      {/*  BULK UPDATE */}
      <button
        onClick={() => bulkUpdate("Delivered")}
        disabled={selectedIds.length === 0}
        className="bg-blue-500 px-3"
      >
        Bulk Deliver
      </button>

      {/*  EXPORT */}
      <button onClick={exportCSV} className="bg-green-500 px-3">
        Export CSV
      </button>

      <button onClick={exportJSON} className="bg-purple-500 px-3">
        Export JSON
      </button>

    </div>
  );
}

export default OrderControls;