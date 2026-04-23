import { useEffect, useState } from "react";
import OrderControls from "../components/OrderControls";
import OrderTable from "../components/OrderTable";
import Pagination from "../components/Pagination";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  let filtered = [...orders];

  //  SEARCH
  if (search) {
    filtered = filtered.filter(o =>
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
    );
  }

  //  FILTER
  if (status) {
    filtered = filtered.filter(o => o.status === status);
  }

  //  SORT
  if (sort === "amount_desc") {
    filtered.sort((a, b) => b.amount - a.amount);
  }

  if (sort === "date_desc") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  //  PAGINATION
  const limit = 5;
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  //  BULK UPDATE
  const bulkUpdate = (newStatus) => {
    const updated = orders.map(o =>
      selectedIds.includes(o.orderId)
        ? { ...o, status: newStatus }
        : o
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    setSelectedIds([]);
  };

  //  EXPORT CSV
  const exportCSV = () => {
    const rows = orders.map(o =>
      `${o.orderId},${o.customer},${o.status},${o.amount},${o.date}`
    );

    const blob = new Blob([rows.join("\n")]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "orders.csv";
    a.click();
  };

  //  EXPORT JSON
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(orders, null, 2)]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "orders.json";
    a.click();
  };

  return (
    <div>

      <OrderControls
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        selectedIds={selectedIds}
        bulkUpdate={bulkUpdate}
        exportCSV={exportCSV}
        exportJSON={exportJSON}
      />

      <OrderTable
        orders={paginated}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />

      <Pagination
        page={page}
        totalPages={Math.ceil(filtered.length / limit)}
        setPage={setPage}
      />

    </div>
  );
}

export default OrdersPage;