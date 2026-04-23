function OrdersTable({ orders, onSelect, selectedIds, setSelectedIds }) {
  if (orders.length === 0) return <p>No orders found</p>;

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Select</th>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((o) => (
          <tr key={o.orderId}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.includes(o.orderId)}
                onChange={() => toggleSelect(o.orderId)}
              />
            </td>

            <td onClick={() => onSelect(o)}>{o.orderId}</td>
            <td onClick={() => onSelect(o)}>{o.customer}</td>
            <td onClick={() => onSelect(o)}>{o.status}</td>
            <td onClick={() => onSelect(o)}>{o.amount}</td>
            <td onClick={() => onSelect(o)}>{o.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;