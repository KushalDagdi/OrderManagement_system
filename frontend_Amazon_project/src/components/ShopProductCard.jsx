import { useState } from "react";

function ShopProductCard({ product, onCreateOrder }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-slate-800 p-4 rounded shadow hover:scale-105 transition">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain mb-3"
      />

      <h3 className="text-sm font-semibold">{product.title}</h3>

      <p className="text-gray-400 text-xs mt-1">
        {product.category}
      </p>

      <p className="text-green-400 mt-2 font-bold">
        ₹ {product.price}
      </p>

      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="w-full mt-2 p-1 bg-slate-700 rounded"
      />

      <button
        onClick={() => onCreateOrder(product, qty)}
        className="mt-2 w-full bg-green-500 hover:bg-green-600 py-1 rounded"
      >
        Create Order
      </button>
    </div>
  );
}

export default ShopProductCard;