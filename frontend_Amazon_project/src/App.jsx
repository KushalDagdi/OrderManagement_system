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

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const url = `http://localhost:5000/orders?page=${page}&limit=${limit}&search=${search}&status=${status}&sort=${sort}`;

      const res = await fetch(url);
      const data = await res.json();

      setOrders(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    setSelectedOrder(null);
  }, [page, search, status, sort]);

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
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 text-center">
          Orders Dashboard
        </h2>

        {/* Filters */}
        <div className="bg-slate-800 p-4 rounded-lg mb-4 shadow">
          <Filters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            sort={sort}
            setSort={setSort}
            setPage={setPage}
          />
        </div>

        {/* Bulk Actions */}
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            onChange={(e) => bulkUpdateStatus(e.target.value)}
            className="bg-slate-800 border border-slate-600 px-3 py-2 rounded"
          >
            <option value="">Bulk Update Status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={exportJSON}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          >
            Export JSON
          </button>

          <button
            onClick={exportCSV}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded"
          >
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-lg shadow overflow-hidden">
          {loading ? (
            <p className="p-4 text-center">Loading...</p>
          ) : (
            <OrdersTable
              orders={orders}
              onSelect={setSelectedOrder}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          )}
        </div>

        {/* Detail */}
        {selectedOrder && (
          <div className="mt-4 p-4">
            <OrderDetail
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
              onStatusChange={updateStatus}
              onNoteChange={updateNote}
            />
          </div>
        )}

        {/* Pagination */}
        <div className="mt-4 p-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>

        

      </div>
    </div>
  );
}

export default App;