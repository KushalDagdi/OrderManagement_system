import { useNavigate } from "react-router-dom";

function OrderTable({ orders }) {
  const navigate = useNavigate();

  return (
    <table className="w-full bg-slate-800">
      <tbody>
        {orders.map((o) => (
          <tr
            key={o.orderId}
            onClick={() => navigate(`/orders/${o.orderId}`)}
            className="cursor-pointer hover:bg-slate-700"
          >
            <td>{o.orderId}</td>
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