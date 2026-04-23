function OrderDetail({ order, onClose, onStatusChange, onNoteChange }) {
  // Safe calculation 
  const subtotal = order.items?.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  ) || 0;

  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax + (order.shipping || 0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "8px",
        background: "#111",
        color: "#fff"
      }}
    >
      <h3>Order Details</h3>

      {/*  Order Info */}
      <p><b>Order ID:</b> {order.orderId}</p>
      <p><b>Customer:</b> {order.customer}</p>
      <p><b>Date:</b> {order.date}</p>

      {/*  Status Update */}
      <label><b>Status:</b> </label>
      <select
        value={order.status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option>Pending</option>
        <option>Shipped</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      <hr />

      {/*  Product List */}
      <h4>Products</h4>
      {order.items && order.items.length > 0 ? (
        <ul>
          {order.items.map((item, i) => (
            <li key={i}>
              {item.name} | Qty: {item.qty} | ₹{item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found</p>
      )}

      <hr />

      {/*  Price Breakdown */}
      <h4>Price Breakdown</h4>
      <p>Subtotal: ₹{subtotal}</p>
      <p>Tax (18%): ₹{tax}</p>
      <p>Shipping: ₹{order.shipping || 0}</p>
      <p><b>Total: ₹{total}</b></p>

      <hr />

      {/*  Internal Note */}
      <h4>Internal Note</h4>
      <textarea
        value={order.note || ""}
        onChange={(e) => onNoteChange(e.target.value)}
        placeholder="Add note..."
        style={{ width: "100%", height: "80px" }}
      />

      <br /><br />

      {/*  Close Button */}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default OrderDetail;