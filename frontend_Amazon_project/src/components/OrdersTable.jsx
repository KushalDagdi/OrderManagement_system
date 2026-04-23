function OrdersTable({ orders, onSelect, selectedIds, setSelectedIds }) {
  if (orders.length === 0) return <p className="p-4">No orders found</p>;

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <table className="w-full border border-slate-600 rounded-lg overflow-hidden">
      <thead className="bg-slate-700">
        <tr>
          <th className="p-3 border">Select</th>
          <th className="p-3 border">Order ID</th>
          <th className="p-3 border">Customer</th>
          <th className="p-3 border">Status</th>
          <th className="p-3 border">Amount</th>
          <th className="p-3 border">Date</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((o) => (
          <tr
            key={o.orderId}
            className="border-b border-slate-600 hover:bg-slate-700"
          >
            <td className="p-3 border">
              <input
                type="checkbox"
                checked={selectedIds.includes(o.orderId)}
                onChange={() => toggleSelect(o.orderId)}
              />
            </td>

            <td className="p-3 border cursor-pointer" onClick={() => onSelect(o)}>{o.orderId}</td>
            <td className="p-3 border cursor-pointer" onClick={() => onSelect(o)}>{o.customer}</td>
            <td className="p-3 border cursor-pointer" onClick={() => onSelect(o)}>{o.status}</td>
            <td className="p-3 border cursor-pointer" onClick={() => onSelect(o)}>{o.amount}</td>
            <td className="p-3 border cursor-pointer" onClick={() => onSelect(o)}>{o.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;