function Filters({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  setPage,
}) {
  return (
    <div className="flex gap-3 flex-wrap">

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        className="bg-slate-800 text-white border border-slate-600 px-3 py-2 rounded"
      />

      <select
        value={status}
        onChange={(e) => {
          setPage(1);
          setStatus(e.target.value);
        }}
        className="bg-slate-800 text-white border border-slate-600 px-3 py-2 rounded"
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-slate-800 text-white border border-slate-600 px-3 py-2 rounded"
      >
        <option value="">Sort</option>
        <option value="amount_desc">Amount High → Low</option>
        <option value="date_desc">Latest First</option>
      </select>

    </div>
  );
}

export default Filters;