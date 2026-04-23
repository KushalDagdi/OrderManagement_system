import ShopProductCard from "./ShopProductCard";

function ShopProductList({ products, onCreateOrder }) {
  if (!products || products.length === 0) {
    return <p className="text-center mt-6">Loading products...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ShopProductCard
            key={p.id}
            product={p}
            onCreateOrder={onCreateOrder}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopProductList;