import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManager from "../components/UserManager";
import ShopProductList from "../components/ShopProductList";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState("User1");

  const navigate = useNavigate();

  /* 
      FETCH PRODUCTS */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  /* 
      CREATE ORDER */
  const createOrder = (product, qty) => {
    const newOrder = {
      orderId: "ORD" + Date.now(),
      customer: currentUser,
      status: "Pending",
      amount: Math.round(product.price * qty),
      date: new Date().toISOString().split("T")[0],
      shipping: 50,

      items: [
        {
          name: product.title,
          price: product.price,
          qty,
        },
      ],

      note: ""
    };

    const existing =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = [...existing, newOrder];

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // optional feedback
    alert("Order created for " + currentUser);
  };

  /* 
      UI */
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Shop Dashboard
      </h1>

      {/*  USER MANAGER */}
      <UserManager
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {/*  PRODUCT LIST */}
      <ShopProductList
        products={products}
        onCreateOrder={createOrder}
      />

      {/*  NAVIGATION */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/orders")}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded"
        >
          View Orders Dashboard
        </button>
      </div>

    </div>
  );
}

export default ShopPage;