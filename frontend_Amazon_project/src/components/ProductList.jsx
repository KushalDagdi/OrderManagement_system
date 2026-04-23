import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <div>
      <h2 className="text-2xl mb-4">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;