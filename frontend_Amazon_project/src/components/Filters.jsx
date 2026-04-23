function Filters({ search, setSearch, status, setStatus, sort, setSort, setPage }) {
  return (
    <div>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      <select
        value={status}
        onChange={(e) => {
          setPage(1);
          setStatus(e.target.value);
        }}
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="amount_desc">Amount High → Low</option>
        <option value="date_desc">Latest First</option>
      </select>
    </div>
  );
}

export default Filters;