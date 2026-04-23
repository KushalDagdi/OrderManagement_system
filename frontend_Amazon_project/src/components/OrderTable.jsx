import { useNavigate } from "react-router-dom";

function OrderTable({ orders, selectedIds, setSelectedIds }) {
  const navigate = useNavigate();

  const toggle = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <table className="w-full bg-slate-800">
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
        {orders.map(o => (
          <tr key={o.orderId}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.includes(o.orderId)}
                onChange={() => toggle(o.orderId)}
              />
            </td>

            <td onClick={() => navigate(`/orders/${o.orderId}`)}>
              {o.orderId}
            </td>

            <td>{o.customer}</td>
            <td>{o.status}</td>
            <td>{o.amount}</td>
            <td>{o.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;