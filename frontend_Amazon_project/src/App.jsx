import { useEffect, useState } from "react";
import Filters from "./components/Filters";
import OrdersTable from "./components/OrdersTable";
import Pagination from "./components/Pagination";
import OrderDetail from "./components/OrderDetail";

function App() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const [loading, setLoading] = useState(false);

  const limit = 5;

  // 🔌 Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const url = `http://localhost:5000/orders?page=${page}&limit=${limit}&search=${search}&status=${status}&sort=${sort}`;

      const res = await fetch(url);
      const data = await res.json();

      setOrders(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    setSelectedOrder(null); // reset detail on change
  }, [page, search, status, sort]);

  // 🔄 Update single order status
  const updateStatus = (newStatus) => {
    setSelectedOrder((prev) => ({ ...prev, status: newStatus }));

    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === selectedOrder.orderId
          ? { ...o, status: newStatus }
          : o
      )
    );
  };

  // 📝 Update note
  const updateNote = (note) => {
    setSelectedOrder((prev) => ({ ...prev, note }));

    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === selectedOrder.orderId
          ? { ...o, note }
          : o
      )
    );
  };

  // 🔥 Bulk status update
  const bulkUpdateStatus = (newStatus) => {
    if (!newStatus) return;

    setOrders((prev) =>
      prev.map((o) =>
        selectedIds.includes(o.orderId)
          ? { ...o, status: newStatus }
          : o
      )
    );

    setSelectedIds([]);
  };

  // 📤 Export JSON
  const exportJSON = () => {
    const selectedOrders = orders.filter((o) =>
      selectedIds.includes(o.orderId)
    );

    const blob = new Blob([JSON.stringify(selectedOrders, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.json";
    a.click();
  };

  // 📤 Export CSV
  const exportCSV = () => {
    const selectedOrders = orders.filter((o) =>
      selectedIds.includes(o.orderId)
    );

    const csv = selectedOrders
      .map(
        (o) =>
          `${o.orderId},${o.customer},${o.status},${o.amount},${o.date}`
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders Dashboard</h2>

      {/* 🔍 Filters */}
      <Filters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        setPage={setPage}
      />

      <br />

      {/* 🔥 Bulk Actions */}
      <div style={{ marginBottom: "10px" }}>
        <select onChange={(e) => bulkUpdateStatus(e.target.value)}>
          <option value="">Bulk Update Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button onClick={exportJSON} style={{ marginLeft: "10px" }}>
          Export JSON
        </button>

        <button onClick={exportCSV} style={{ marginLeft: "10px" }}>
          Export CSV
        </button>
      </div>

      {/* 📊 Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <OrdersTable
          orders={orders}
          onSelect={setSelectedOrder}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      )}

      {/* 📄 Detail */}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={updateStatus}
          onNoteChange={updateNote}
        />
      )}

      <br />

      {/* 📄 Pagination */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default App;