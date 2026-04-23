function ProductCard({ product }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow hover:scale-105 transition">

      <img
        src={product.image}
        alt=""
        className="h-40 mx-auto object-contain mb-3"
      />

      <h3 className="font-bold text-lg">{product.title}</h3>

      <p className="text-sm text-gray-400 mt-1">
        {product.category}
      </p>

      <p className="mt-2 text-green-400 font-semibold">
        ₹ {product.price}
      </p>

    </div>
  );
}

export default ProductCard;